'use client';

import { useEffect, useRef } from 'react';
import type { AboutConfig } from '@/types';

export default function About({ config }: { config: AboutConfig }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const words = config.text.trim().split(/\s+/);
    textEl.innerHTML = words.map((w) => `<span class="about-word">${w}</span>`).join(' ');
    const wordEls = textEl.querySelectorAll('.about-word');

    const update = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.8 - r.top) / (vh * 0.7)));
      const n = Math.floor(p * wordEls.length);
      wordEls.forEach((el, i) => el.classList.toggle('revealed', i < n));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [config.text]);

  return (
    <section ref={sectionRef} className="relative z-[1] section-bg-secondary py-section px-6 transition-colors duration-[450ms]" id="about">
      <div className="max-w-[780px] mx-auto py-20">
        <p ref={textRef} className="text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.4] tracking-subhead">
          {config.text}
        </p>
      </div>
    </section>
  );
}
