'use client';

import { useEffect, useRef } from 'react';
import type { ExperienceConfig } from '@/types';

export default function Experience({ config }: { config: ExperienceConfig }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    ref.current.querySelectorAll('.reveal-fade').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative z-[1] section-bg-dark py-section px-6 transition-colors duration-[450ms]" id="experience" aria-labelledby="experience-heading" data-nav-dark>
      <div className="max-w-content mx-auto">
        <p className="reveal-fade text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-3">{config.label}</p>
        <h2 id="experience-heading" className="reveal-fade text-[clamp(32px,5vw,48px)] font-bold tracking-headline leading-[1.1]" style={{ transitionDelay: '0.08s' }}>{config.headline}</h2>
        <p className="reveal-fade text-[17px] text-[#a1a1a6] leading-relaxed mt-3.5 max-w-[600px]" style={{ transitionDelay: '0.16s' }}>{config.description}</p>

        <div className="mt-12 flex flex-col gap-10">
          {config.items.map((item, i) => (
            <div key={i} className={`reveal-fade pb-10 ${i < config.items.length - 1 ? 'border-b border-white/[0.08]' : ''}`}>
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <span className="text-lg font-semibold text-[#f5f5f7]">{item.role}</span>
                <span className="text-sm text-[#86868b]">{item.period}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[15px] text-accent">{item.company}</span>
                {item.location && <span className="text-sm text-[#6e6e73]">· {item.location}</span>}
              </div>
              <p className="text-sm text-[#a1a1a6] leading-relaxed mt-3">{item.description}</p>
              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {item.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3 text-sm text-[#a1a1a6] leading-relaxed">
                      <span className="text-accent mt-1.5 shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
