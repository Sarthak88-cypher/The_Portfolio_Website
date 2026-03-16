'use client';

import { useEffect, useRef } from 'react';
import type { ProjectsConfig } from '@/types';

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

export default function Projects({ config }: { config: ProjectsConfig }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    ref.current.querySelectorAll('.reveal-fade, .reveal-scale').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative z-[1] section-bg-secondary py-section px-6 transition-colors duration-[450ms]" id="projects" aria-labelledby="projects-heading">
      <div className="max-w-content mx-auto">
        <p className="reveal-fade text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-3">{config.label}</p>
        <h2 id="projects-heading" className="reveal-fade text-[clamp(32px,5vw,48px)] font-bold tracking-headline leading-[1.1]" style={{ transitionDelay: '0.08s' }}>{config.headline}</h2>
        <p className="reveal-fade text-[17px] text-content-secondary leading-relaxed mt-3.5 max-w-[600px]" style={{ transitionDelay: '0.16s' }}>{config.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mt-12">
          {config.items.map((item) => (
            <div
              key={item.title}
              className={`reveal-scale rounded-[20px] bg-surface-card overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col ${item.featured ? 'md:col-span-2' : ''}`}
              style={{ border: '1px solid var(--border-default)' }}
            >
              {/* Subtle top accent line */}
              <div className="h-[3px] w-full" style={{ background: 'var(--accent)', opacity: 0.5 }} />

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-[11px] py-1 px-2.5 rounded-full font-medium" style={{ background: 'var(--tag-bg)', color: 'var(--tag-color)' }}>
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 4 && (
                    <span className="text-[11px] py-1 px-2.5 rounded-full font-medium" style={{ background: 'var(--tag-bg)', color: 'var(--tag-color)' }}>
                      +{item.tags.length - 4}
                    </span>
                  )}
                </div>
                <h3 className="text-[22px] font-semibold tracking-subhead mb-2">{item.title}</h3>
                <p className="text-sm text-content-secondary leading-relaxed flex-1">{item.description}</p>
                {item.link && item.link !== '#' && (
                  <a
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-sm text-accent no-underline mt-5 hover:gap-2 transition-all duration-300"
                  >
                    {item.link.includes('github.com') ? 'View on GitHub' : 'Learn more'} <ArrowIcon />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
