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
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
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

        <div className="mt-14 space-y-10">
          {config.groups.map((group, gi) => (
            <div key={group.label}>
              {/* Category header with line */}
              <div className="reveal-fade flex items-center gap-4 mb-5" style={{ transitionDelay: `${0.04 * gi}s` }}>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase shrink-0" style={{ color: 'var(--content-tertiary)' }}>
                  {group.label}
                </span>
                <span className="flex-1 h-px" style={{ background: 'var(--border-strong)' }} />
              </div>

              {/* Icons flow */}
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, i) => (
                  <div
                    key={item.name}
                    className="reveal-scale group flex items-center gap-2.5 py-2.5 px-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default"
                    style={{
                      background: 'var(--surface-card)',
                      border: '1px solid var(--border-default)',
                      transitionDelay: `${0.03 * i}s`,
                    }}
                  >
                    <StackIcon name={item.icon as any} variant={variant} className="w-6 h-6 shrink-0" />
                    <span className="text-[13px] font-medium text-content-secondary group-hover:text-content-primary transition-colors duration-200">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
