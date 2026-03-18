'use client';

import { useEffect, useRef, useState } from 'react';
import StackIcon from 'tech-stack-icons';
import { useTheme } from 'next-themes';
import type { ProjectsConfig, ProjectItem } from '@/types';

// Map project tag names → tech-stack-icons icon names
const TAG_ICON_MAP: Record<string, string> = {
  'Next.js': 'nextjs2',
  'React': 'react',
  'React 19': 'react',
  'React Native': 'reactnative',
  'TypeScript': 'typescript',
  'JavaScript': 'js',
  'Python': 'python',
  'Java': 'java',
  'Node.js': 'nodejs',
  'Express.js': 'expressjs',
  'GraphQL': 'graphql',
  'PostgreSQL': 'postgresql',
  'MongoDB': 'mongodb',
  'Redis': 'redis',
  'Docker': 'docker',
  'AWS': 'aws',
  'AWS Lambda': 'amznwebserv',
  'Prisma': 'prisma',
  'Playwright': 'playwright',
  'Claude API': 'claude',
  'OpenAI': 'openai',
  'BullMQ': 'redis',
  'Material UI': 'materialui',
  'Tailwind CSS': 'tailwindcss',
  'OAuth 2.0': 'oauth',
  'Jest': 'jest',
  'Cypress': 'cypress',
  'Axios': 'axios',
  'CSS': 'css3',
  'Apollo': 'apollographql',
  'Firebase': 'firebase',
  'Heroku': 'heroku',
  'Supabase': 'supabase',
  'Vite': 'vitejs',
  'Git': 'git',
  'WebRTC': 'webrtc',
};

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

function TechTag({ tag, variant }: { tag: string; variant: 'light' | 'dark' }) {
  const iconName = TAG_ICON_MAP[tag];

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] py-1 px-2.5 rounded-full font-medium"
      style={{ background: 'var(--tag-bg)', color: 'var(--tag-color)' }}
    >
      {iconName && (
        <StackIcon name={iconName as any} variant={variant} className="w-3.5 h-3.5 shrink-0" />
      )}
      {tag}
    </span>
  );
}

function MoreTag({ count, hiddenTags, variant, onExpand }: { count: number; hiddenTags: string[]; variant: 'light' | 'dark'; onExpand: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onExpand}
        className="text-[11px] py-1 px-2.5 rounded-full font-medium border-none cursor-pointer transition-all duration-300"
        style={{
          background: hovered ? 'var(--accent)' : 'transparent',
          color: hovered ? '#fff' : 'var(--accent)',
          border: '1.5px dashed var(--accent)',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        +{count} more
      </button>
      {hovered && (
        <div
          className="absolute left-0 right-auto top-full mt-3 p-3 rounded-2xl pointer-events-none z-10 max-sm:left-auto max-sm:right-0"
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
            backdropFilter: 'saturate(180%) blur(20px)',
            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
            animation: 'tooltip-in 0.25s cubic-bezier(0.16,1,0.3,1)',
            width: 'fit-content',
            minWidth: 'min(200px, 70vw)',
            maxWidth: 'min(400px, 85vw)',
          }}
        >
          {/* Arrow */}
          <div
            className="absolute -top-1.5 left-5 max-sm:left-auto max-sm:right-5 w-3 h-3 rotate-45"
            style={{
              background: 'var(--surface-card)',
              borderLeft: '1px solid var(--border-default)',
              borderTop: '1px solid var(--border-default)',
            }}
          />
          <div className="flex flex-wrap gap-1.5">
            {hiddenTags.map((tag) => (
              <TechTag key={tag} tag={tag} variant={variant} />
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

function CollapseTag({ onCollapse }: { onCollapse: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onCollapse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-[11px] py-1 px-2.5 rounded-full font-medium border-none cursor-pointer transition-all duration-300 inline-flex items-center gap-1"
      style={{
        background: hovered ? 'var(--tag-bg)' : 'transparent',
        color: 'var(--content-tertiary)',
        border: '1.5px solid var(--border-strong)',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
      less
    </button>
  );
}

function TagList({ tags, initialCount, variant }: { tags: string[]; initialCount: number; variant: 'light' | 'dark' }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? tags : tags.slice(0, initialCount);
  const remaining = tags.length - initialCount;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-5">
      {visible.map((tag) => (
        <TechTag key={tag} tag={tag} variant={variant} />
      ))}
      {remaining > 0 && !expanded && (
        <MoreTag count={remaining} hiddenTags={tags.slice(initialCount)} variant={variant} onExpand={() => setExpanded(true)} />
      )}
      {expanded && remaining > 0 && (
        <CollapseTag onCollapse={() => setExpanded(false)} />
      )}
    </div>
  );
}

function ProjectCard({ item, size = 'default', variant }: { item: ProjectItem; size?: 'large' | 'default'; variant: 'light' | 'dark' }) {
  const isLarge = size === 'large';
  const visibleCount = isLarge ? 6 : 4;

  return (
    <div
      className={`reveal-scale rounded-[20px] bg-surface-card overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col ${item.featured ? 'md:col-span-2' : ''}`}
      style={{ border: '1px solid var(--border-default)' }}
    >
      <div className="h-[3px] w-full" style={{ background: 'var(--accent)', opacity: 0.5 }} />
      <div className={`${isLarge ? 'p-9' : 'p-7'} flex flex-col flex-1`}>
        <TagList tags={item.tags} initialCount={visibleCount} variant={variant} />
        <h3 className={`${isLarge ? 'text-[24px]' : 'text-[20px]'} font-semibold tracking-subhead mb-2`}>{item.title}</h3>
        <p className={`${isLarge ? 'text-[15px]' : 'text-sm'} text-content-secondary leading-relaxed flex-1`}>{item.description}</p>
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
  );
}

export default function Projects({ config }: { config: ProjectsConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const variant = theme === 'light' ? 'light' : 'dark';

  const featured = config.items.filter((i) => i.category === 'featured');
  const personal = config.items.filter((i) => i.category === 'personal');

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

        {/* ── Production Work ── */}
        <div className="mt-14">
          <div className="reveal-fade flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: 'var(--content-tertiary)' }}>
              What I ship at work
            </span>
            <span className="flex-1 h-px" style={{ background: 'var(--border-strong)' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
            {featured.map((item) => (
              <ProjectCard key={item.title} item={item} size="large" variant={variant} />
            ))}
          </div>
        </div>

        {/* ── Side Projects ── */}
        <div className="mt-16">
          <div className="reveal-fade flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: 'var(--content-tertiary)' }}>
              Side projects & explorations
            </span>
            <span className="flex-1 h-px" style={{ background: 'var(--border-strong)' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {personal.map((item) => (
              <ProjectCard key={item.title} item={item} size="default" variant={variant} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
