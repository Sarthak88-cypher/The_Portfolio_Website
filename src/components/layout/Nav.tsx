'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, useCallback } from 'react';
import type { NavConfig } from '@/types';

interface NavProps {
  config: NavConfig;
}

export default function Nav({ config }: NavProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkDarkSections = () => {
      const darkSections = document.querySelectorAll('[data-nav-dark]');
      let anyDark = false;
      darkSections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top < 60 && r.bottom > 0) anyDark = true;
      });
      setOverDark(anyDark);
    };

    window.addEventListener('scroll', checkDarkSections, { passive: true });
    checkDarkSections();
    return () => window.removeEventListener('scroll', checkDarkSections);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <nav className={`glass-nav fixed top-0 left-0 right-0 z-[100] h-nav ${overDark ? 'over-dark' : ''}`}>
        <div className="max-w-content mx-auto h-full px-[22px] flex items-center justify-between">
          <a href="#hero" className="text-lg font-semibold text-content-primary no-underline tracking-subhead transition-colors duration-[450ms]">
            {config.logo}
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex list-none gap-7">
            {config.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-xs text-content-secondary no-underline hover:text-content-primary transition-colors duration-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="bg-transparent border-none cursor-pointer text-content-secondary hover:text-content-primary w-[18px] h-[18px] transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {mounted && (
                theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M17.72 17.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M17.72 6.28l1.06-1.06" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                )
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden bg-transparent border-none cursor-pointer text-content-secondary hover:text-content-primary w-[20px] h-[20px] transition-colors duration-200"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[99] md:hidden"
          style={{ background: 'var(--surface-primary)', paddingTop: 'var(--nav-h, 48px)' }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-1 -mt-12">
            {config.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-2xl font-semibold text-content-primary no-underline py-4 px-8 rounded-2xl transition-all duration-200 hover:bg-[var(--tag-bg)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/assets/resume.pdf"
              download="Sai_Sarthak_Mohapatra_Resume.pdf"
              onClick={closeMenu}
              className="text-lg font-medium text-accent no-underline mt-6 py-3 px-8 rounded-full transition-all duration-200"
              style={{ background: 'var(--tag-bg)' }}
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
}
