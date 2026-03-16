import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic tokens — these reference CSS variables set in globals.css
        surface: {
          primary: 'var(--surface-primary)',
          secondary: 'var(--surface-secondary)',
          card: 'var(--surface-card)',
          nav: 'var(--surface-nav)',
        },
        content: {
          primary: 'var(--content-primary)',
          secondary: 'var(--content-secondary)',
          tertiary: 'var(--content-tertiary)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          strong: 'var(--border-strong)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        content: '980px',
      },
      spacing: {
        nav: '48px',
        section: 'clamp(60px, 10vw, 120px)',
      },
      letterSpacing: {
        headline: '-0.04em',
        subhead: '-0.02em',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backdropBlur: {
        apple: '20px',
      },
    },
  },
  plugins: [],
};

export default config;
