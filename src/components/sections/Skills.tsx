'use client';

import { useEffect, useRef } from 'react';
import StackIcon from 'tech-stack-icons';
import { useTheme } from 'next-themes';
import type { SkillsConfig } from '@/types';

export default function Skills({ config }: { config: SkillsConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    ref.current.querySelectorAll('.reveal-fade, .reveal-scale').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const variant = theme === 'light' ? 'light' : 'dark';

  return (
    <section ref={ref} className="relative z-[1] section-bg-primary py-section px-6 transition-colors duration-[450ms]" id="skills" aria-labelledby="skills-heading">
      <div className="max-w-content mx-auto">
        <p className="reveal-fade text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-3">{config.label}</p>
        <h2 id="skills-heading" className="reveal-fade text-[clamp(32px,5vw,48px)] font-bold tracking-headline leading-[1.1]" style={{ transitionDelay: '0.08s' }}>{config.headline}</h2>
        <p className="reveal-fade text-[17px] text-content-secondary leading-relaxed mt-3.5 max-w-[600px]" style={{ transitionDelay: '0.16s' }}>{config.description}</p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 mt-12">
          {config.items.map((item) => (
            <div key={item.name} className="reveal-scale flex flex-col items-center gap-3 py-6 px-3 rounded-2xl bg-surface-card shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <StackIcon name={item.icon as any} variant={variant} className="w-10 h-10" />
              <span className="text-[12px] font-medium text-content-secondary text-center leading-tight">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
