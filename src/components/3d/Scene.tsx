'use client';

import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { Group, Points, TextureLoader, SRGBColorSpace, DoubleSide, ACESFilmicToneMapping } from 'three';
import type { CharacterConfig, SceneKeyframe } from '@/types';
import { sceneKeyframes } from '@/config/theme';

// ═══════════════════════════════════════
// CHARACTER SPRITE (2D image in 3D scene)
// ═══════════════════════════════════════
function CharacterSprite({ config }: { config: Extract<CharacterConfig, { type: 'image' }> }) {
  const groupRef = useRef<Group>(null);
  const texture = useLoader(TextureLoader, config.src);
  const { theme } = useTheme();
  const isDark = theme !== 'light';

  // Scroll & mouse state
  const scrollRef = useRef(0);
  const smoothScrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const screenScale = useRef(1); // responsive multiplier for positions

  useEffect(() => {
    const updateScreenScale = () => {
      const w = window.innerWidth;
      // Mobile: <640px → 0.35, Tablet: 640-1024 → 0.55-0.8, Desktop: >1024 → 1
      if (w < 640) screenScale.current = 0.35;
      else if (w < 1024) screenScale.current = 0.4 + (w - 640) / (1024 - 640) * 0.4;
      else screenScale.current = 1;
    };
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = total > 0 ? window.scrollY / total : 0;
    };
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScreenScale, { passive: true });
    document.addEventListener('mousemove', onMouse, { passive: true });
    updateScreenScale();
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScreenScale);
      document.removeEventListener('mousemove', onMouse);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;

    // Smooth interpolation
    smoothScrollRef.current += (scrollRef.current - smoothScrollRef.current) * 0.06;
    smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.04;
    smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.04;

    // Keyframe interpolation
    const kf = sceneKeyframes;
    const seg = smoothScrollRef.current * (kf.length - 1);
    const idx = Math.min(Math.floor(seg), kf.length - 2);
    const frac = seg - idx;
    const st = frac * frac * (3 - 2 * frac); // smoothstep
    const k0 = kf[idx];
    const k1 = kf[idx + 1];
    const lerp = (a: number, b: number) => a + (b - a) * st;

    // Idle float
    const floatY = Math.sin(t * 0.8) * 0.06;
    const floatR = Math.sin(t * 0.6) * 0.01;
    const mx = smoothMouseRef.current.x;
    const my = smoothMouseRef.current.y;
    const ss = screenScale.current; // responsive multiplier

    groupRef.current.position.set(
      lerp(k0.px, k1.px) * ss + mx * 0.15 * ss,
      lerp(k0.py, k1.py) + floatY + my * -0.08,
      lerp(k0.pz, k1.pz)
    );
    groupRef.current.rotation.set(
      my * 0.03,
      mx * 0.06 * ss + floatR,
      lerp(k0.rz, k1.rz) * ss
    );

    // On mobile, scale down slightly to fit
    const baseScale = lerp(k0.scale, k1.scale);
    const mobileScaleMod = ss < 0.5 ? 0.75 : ss < 0.8 ? 0.85 : 1;
    const targetScale = baseScale * mobileScaleMod;
    const s = groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * 0.06;
    groupRef.current.scale.setScalar(s);
  });

  // Make texture transparent (remove white background)
  texture.colorSpace = SRGBColorSpace;

  const w = config.width ?? 4;
  const h = config.height ?? 3;

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.05}
          opacity={0.95}
          side={DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ═══════════════════════════════════════
// PARTICLES
// ═══════════════════════════════════════
function Particles({ count = 80 }: { count?: number }) {
  const ref = useRef<Points>(null);
  const { theme } = useTheme();

  const positions = useRef(new Float32Array(count * 3));
  const velocities = useRef<{ x: number; y: number; z: number }[]>([]);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 14;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 10;
      velocities.current.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.003,
      });
    }
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const v = velocities.current[i];
      if (!v) continue;
      pos[i * 3] += v.x;
      pos[i * 3 + 1] += v.y;
      pos[i * 3 + 2] += v.z;
      if (pos[i * 3] > 7) pos[i * 3] = -7;
      if (pos[i * 3] < -7) pos[i * 3] = 7;
      if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5;
      if (pos[i * 3 + 1] < -5) pos[i * 3 + 1] = 5;
      if (pos[i * 3 + 2] > 5) pos[i * 3 + 2] = -5;
      if (pos[i * 3 + 2] < -5) pos[i * 3 + 2] = 5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y += 0.0003;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions.current} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={theme === 'light' ? '#8888aa' : '#ffffff'}
        transparent
        opacity={theme === 'light' ? 0.15 : 0.35}
        sizeAttenuation
      />
    </points>
  );
}

// ═══════════════════════════════════════
// MAIN SCENE
// ═══════════════════════════════════════
export default function Scene3D({ characterConfig }: { characterConfig: CharacterConfig }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.2, 7], fov: 35 }}
        gl={{ alpha: true, antialias: true, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 8, 6]} intensity={1.8} />
        <directionalLight position={[-5, 4, -3]} intensity={0.6} color="#6688cc" />
        <directionalLight position={[0, 2, -8]} intensity={1.0} />
        <directionalLight position={[0, -5, 3]} intensity={0.3} color="#2997ff" />


        {characterConfig.type === 'image' && (
          <Suspense fallback={null}>
            <CharacterSprite config={characterConfig} />
          </Suspense>
        )}

        <Particles />
      </Canvas>
    </div>
  );
}
