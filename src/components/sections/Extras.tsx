'use client';

import { useEffect, useRef, useState } from 'react';
import type { ExtrasConfig } from '@/types';

type Tab = 'certifications' | 'education' | 'softSkills' | 'languages' | 'interests';

export default function Extras({ config }: { config: ExtrasConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('certifications');

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    ref.current.querySelectorAll('.reveal-fade').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'certifications', label: 'Certifications' },
    { key: 'education', label: 'Education' },
    { key: 'softSkills', label: 'Soft Skills' },
    { key: 'languages', label: 'Languages' },
    { key: 'interests', label: 'Interests' },
  ];

  return (
    <section ref={ref} className="relative z-[1] section-bg-primary py-section px-6 transition-colors duration-[450ms]" id="extras" aria-labelledby="extras-heading">
      <div className="max-w-content mx-auto">
        <p className="reveal-fade text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-3">{config.label}</p>
        <h2 id="extras-heading" className="reveal-fade text-[clamp(32px,5vw,48px)] font-bold tracking-headline leading-[1.1]" style={{ transitionDelay: '0.08s' }}>{config.headline}</h2>

        {/* Tabs */}
        <div role="tablist" className="reveal-fade flex gap-1 mt-10 p-1 rounded-xl w-full overflow-x-auto scrollbar-hide" style={{ background: 'var(--tag-bg)', transitionDelay: '0.16s' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              id={`tab-${tab.key}`}
              aria-controls={`panel-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
                activeTab === tab.key
                  ? 'shadow-sm'
                  : 'hover:opacity-80'
              }`}
              style={{
                background: activeTab === tab.key ? 'var(--surface-card)' : 'transparent',
                color: activeTab === tab.key ? 'var(--content-primary)' : 'var(--content-tertiary)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} className="mt-8 min-h-[200px]">
          {activeTab === 'certifications' && (
            <div className="grid gap-4">
              {config.certifications.map((cert) => {
                const Wrapper = cert.link ? 'a' : 'div';
                const linkProps = cert.link ? { href: cert.link, target: '_blank', rel: 'noopener noreferrer' } : {};
                return (
                  <Wrapper
                    key={cert.name}
                    {...linkProps as any}
                    className={`flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 no-underline ${cert.link ? 'cursor-pointer hover:shadow-lg' : ''}`}
                    style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--tag-bg)' }}>
                      <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[15px] font-semibold" style={{ color: 'var(--content-primary)' }}>{cert.name}</h3>
                      <p className="text-sm mt-1" style={{ color: 'var(--content-secondary)' }}>
                        {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
                      </p>
                    </div>
                    {cert.link && (
                      <svg className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    )}
                  </Wrapper>
                );
              })}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="grid gap-4">
              {config.education.map((edu) => (
                <div
                  key={edu.degree}
                  className="flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--tag-bg)' }}>
                    <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold" style={{ color: 'var(--content-primary)' }}>{edu.degree}</h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--content-secondary)' }}>{edu.institution} · {edu.period}</p>
                    {edu.details && <p className="text-sm mt-1" style={{ color: 'var(--content-tertiary)' }}>{edu.details}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'languages' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {config.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--tag-bg)' }}>
                    <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold" style={{ color: 'var(--content-primary)' }}>{lang.name}</h3>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--content-secondary)' }}>{lang.proficiency}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'softSkills' && (
            <div className="grid gap-4 sm:grid-cols-2">
              {config.softSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl" style={{ background: 'var(--tag-bg)' }}>
                    {skill.emoji}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold" style={{ color: 'var(--content-primary)' }}>{skill.name}</h3>
                    {skill.description && <p className="text-sm mt-1" style={{ color: 'var(--content-secondary)' }}>{skill.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'interests' && (
            <div className="flex flex-wrap gap-3">
              {config.interests.map((interest) => (
                <span
                  key={interest.name}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:scale-[1.04]"
                  style={{ background: 'var(--surface-card)', color: 'var(--content-secondary)', border: '1px solid var(--border-default)' }}
                >
                  <span className="text-base">{interest.emoji}</span>
                  {interest.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
