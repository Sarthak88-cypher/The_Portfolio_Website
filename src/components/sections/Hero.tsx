'use client';

import { useEffect, useRef } from 'react';
import type { HeroConfig } from '@/types';

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

export default function Hero({ config }: { config: HeroConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const content = contentRef.current;
      const hint = hintRef.current;
      if (!container || !content || !hint) return;

      const sy = window.scrollY;
      const hh = container.offsetHeight;
      const vh = window.innerHeight;
      const p = Math.min(sy / (hh - vh), 1);

      const tf = Math.max(0, 1 - p * 1.8);
      content.style.opacity = String(tf);
      content.style.transform = `scale(${1 - Math.min(p * 1.8, 1) * 0.06}) translateY(${Math.min(p * 1.8, 1) * -20}px)`;
      hint.style.opacity = String(Math.max(0, 1 - p * 4));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section ref={containerRef} className="h-[250vh] relative z-[1]" id="hero" aria-labelledby="hero-heading">
      <div className="sticky top-0 h-screen flex items-center justify-center"
           style={{ background: 'radial-gradient(ellipse at 50% 40%, var(--hero-glow) 0%, transparent 65%)' }}>
        <div ref={contentRef} className="relative z-[2] text-center max-w-[900px] px-6 will-change-transform">
          <p className="text-base font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--hero-overline)' }}>
            {config.overline}
          </p>
          <h1 id="hero-heading" className="text-[clamp(36px,6vw,76px)] font-bold tracking-headline leading-[1.05] md:whitespace-nowrap" style={{ color: 'var(--hero-headline)', textShadow: '0 2px 30px rgba(0,0,0,0.08)' }}>
            {config.headline}
          </h1>
          <p className="text-[19px] leading-relaxed mt-5 max-w-[520px] mx-auto" style={{ color: 'var(--hero-subhead)', textShadow: '0 2px 24px var(--surface-primary), 0 0 60px var(--surface-primary), 0 0 80px var(--surface-primary)' }}>
            {config.subhead}
          </p>
          <div className="mt-9 flex gap-8 justify-center flex-wrap">
            {config.ctas.map((cta) => (
              <a key={cta.href} href={cta.href} className="inline-flex items-center gap-1.5 text-[19px] text-accent no-underline hover:text-accent-hover hover:gap-2.5 transition-all duration-300">
                {cta.label} <ArrowIcon />
              </a>
            ))}
          </div>
        </div>

        <div ref={hintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 rounded-xl border-2 border-content-tertiary opacity-40 z-[2]">
          <span className="block w-1 h-2 rounded-sm bg-content-tertiary mx-auto mt-1.5" style={{ animation: 'scroll-bounce 1.8s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}
