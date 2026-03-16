// ═══════════════════════════════════════
// Design Tokens — Apple-inspired
// ═══════════════════════════════════════
// These feed into CSS custom properties in globals.css
// and Tailwind via tailwind.config.ts

export const theme = {
  dark: {
    surface: {
      primary: '#0a0a0a',       // not pure black — prevents pixel lag
      secondary: '#111111',
      card: '#161617',
      nav: 'rgba(10,10,10,0.72)',
      navDark: 'rgba(0,0,0,0.88)',
    },
    content: {
      primary: '#f5f5f7',
      secondary: '#a1a1a6',
      tertiary: '#6e6e73',
    },
    accent: '#2997ff',
    accentHover: '#64b5f6',
    border: {
      default: 'rgba(255,255,255,0.06)',
      strong: '#333336',
    },
    tag: {
      bg: 'rgba(255,255,255,0.08)',
      color: '#a1a1a6',
    },
  },
  light: {
    surface: {
      primary: '#ffffff',
      secondary: '#f5f5f7',
      card: '#f5f5f7',
      nav: 'rgba(251,251,253,0.72)',
      navDark: 'rgba(30,30,30,0.82)',
    },
    content: {
      primary: '#1d1d1f',
      secondary: '#86868b',
      tertiary: '#6e6e73',
    },
    accent: '#0066cc',
    accentHover: '#0077ed',
    border: {
      default: 'rgba(0,0,0,0.06)',
      strong: '#d2d2d7',
    },
    tag: {
      bg: 'rgba(0,0,0,0.06)',
      color: '#6e6e73',
    },
  },
} as const;

// 3D scene keyframes — controls laptop position/rotation per section
export const sceneKeyframes = [
  { px: 0, py: -0.2, pz: 0, rx: -0.25, ry: 0.3, rz: 0, lid: -2.0, scale: 1 },       // Hero
  { px: 2.8, py: 0.3, pz: -0.5, rx: -0.15, ry: -0.55, rz: 0.04, lid: -2.05, scale: 0.85 }, // About
  { px: -2.5, py: -0.1, pz: -0.5, rx: -0.2, ry: 0.65, rz: -0.03, lid: -1.95, scale: 0.85 },   // Skills
  { px: 2.2, py: 0.3, pz: -0.5, rx: -0.18, ry: -0.45, rz: 0.06, lid: -1.85, scale: 0.85 }, // Projects
  { px: -2.8, py: 0.2, pz: -0.5, rx: -0.28, ry: 0.55, rz: -0.04, lid: -1.6, scale: 0.8 },  // Experience
  { px: 0, py: -0.3, pz: 0, rx: -0.5, ry: 0, rz: 0, lid: -0.4, scale: 0.9 },            // Contact
];
