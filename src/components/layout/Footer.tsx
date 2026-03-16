import type { FooterConfig } from '@/types';

export default function Footer({ config }: { config: FooterConfig }) {
  return (
    <footer className="relative z-[1] bg-surface-secondary py-5 px-6 border-t border-border-strong transition-colors duration-[450ms]">
      <div className="max-w-content mx-auto flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-6">
          {config.links.map((link) => (
            <a key={link.href} href={link.href} className="text-xs text-content-tertiary no-underline hover:text-content-primary transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-content-tertiary">{config.copyright}</p>
      </div>
    </footer>
  );
}
