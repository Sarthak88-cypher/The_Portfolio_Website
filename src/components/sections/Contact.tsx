'use client';

import { useEffect, useRef, useState } from 'react';
import type { ContactConfig } from '@/types';
import { contactIcons } from '@/config/icons';

// ═══════════════════════════════════════
// EMAIL COMPOSE FORM
// ═══════════════════════════════════════
function EmailCompose({ email, web3formsKey }: { email: string; web3formsKey?: string }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');

    // If web3forms key is set, send via API
    if (web3formsKey) {
      try {
        const formData = new FormData();
        formData.append('access_key', web3formsKey);
        formData.append('from_name', form.name);
        formData.append('email', form.email);
        formData.append('subject', form.subject || `Message from ${form.name}`);
        formData.append('message', form.message);
        if (attachment) {
          formData.append('attachment', attachment);
        }

        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          setStatus('sent');
          setForm({ name: '', email: '', subject: '', message: '' });
          setAttachment(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    } else {
      // Fallback: open mailto
      const mailto = `mailto:${email}?subject=${encodeURIComponent(form.subject || `Message from ${form.name}`)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
      window.open(mailto, '_blank');
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    }

  };

  // Reset status after sent/error
  useEffect(() => {
    if (status === 'sent' || status === 'error') {
      const t = setTimeout(() => setStatus('idle'), 4000);
      return () => clearTimeout(t);
    }
  }, [status]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[560px] lg:max-w-[640px] mx-auto px-1">
      {/* Email editor card */}
      <div
        className="rounded-2xl overflow-hidden transition-colors duration-300"
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-4 sm:px-5 py-3"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          {/* Traffic lights */}
          <div className="flex gap-2 mr-4">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs font-medium" style={{ color: 'var(--content-tertiary)' }}>New Message</span>
        </div>

        {/* To field */}
        <div
          className="flex items-center gap-3 px-4 sm:px-5 py-2.5"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          <span className="text-sm font-medium shrink-0" style={{ color: 'var(--content-tertiary)' }}>To:</span>
          <span className="text-sm" style={{ color: 'var(--content-secondary)' }}>{email}</span>
        </div>

        {/* From field — name */}
        <div
          className="flex items-center gap-3 px-4 sm:px-5 py-2.5"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          <span className="text-sm font-medium shrink-0" style={{ color: 'var(--content-tertiary)' }}>From:</span>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-[var(--content-tertiary)]"
            style={{ color: 'var(--content-primary)' }}
          />
        </div>

        {/* Email field */}
        <div
          className="flex items-center gap-3 px-4 sm:px-5 py-2.5"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          <span className="text-sm font-medium shrink-0" style={{ color: 'var(--content-tertiary)' }}>Email:</span>
          <input
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-[var(--content-tertiary)]"
            style={{ color: 'var(--content-primary)' }}
          />
        </div>

        {/* Subject field */}
        <div
          className="flex items-center gap-3 px-4 sm:px-5 py-2.5"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          <span className="text-sm font-medium shrink-0" style={{ color: 'var(--content-tertiary)' }}>Subject:</span>
          <input
            type="text"
            placeholder="What's this about?"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--content-tertiary)]"
            style={{ color: 'var(--content-primary)' }}
          />
        </div>

        {/* Message body */}
        <textarea
          placeholder="Write your message here..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={8}
          className="w-full bg-transparent text-sm outline-none resize-none px-4 sm:px-5 py-4 placeholder:text-[var(--content-tertiary)]"
          style={{ color: 'var(--content-primary)' }}
        />

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between px-4 sm:px-5 py-3"
          style={{ borderTop: '1px solid var(--border-default)' }}
        >
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip"
              onChange={(e) => setAttachment(e.target.files?.[0] || null)}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer transition-colors duration-200 hover:opacity-80"
              title="Attach file"
            >
              <svg className="w-4 h-4" style={{ color: attachment ? 'var(--accent)' : 'var(--content-tertiary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
              </svg>
              {attachment && (
                <span className="text-xs truncate max-w-[120px]" style={{ color: 'var(--accent)' }}>
                  {attachment.name}
                </span>
              )}
            </button>
            {attachment && (
              <button
                type="button"
                onClick={() => { setAttachment(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                className="bg-transparent border-none cursor-pointer"
                title="Remove attachment"
              >
                <svg className="w-3.5 h-3.5" style={{ color: 'var(--content-tertiary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 text-sm font-medium py-2 px-5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            style={{
              background: 'var(--btn-primary)',
              color: '#fff',
            }}
          >
            {status === 'sending' ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : status === 'sent' ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Sent!
              </>
            ) : status === 'error' ? (
              'Failed — try again'
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                Send
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

// ═══════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════
export default function Contact({ config }: { config: ContactConfig }) {
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
    <section ref={ref} className="relative z-[1] section-bg-primary py-section px-6 transition-colors duration-[450ms]" id="contact" aria-labelledby="contact-heading">
      <div className="max-w-content mx-auto">
        <h2 id="contact-heading" className="reveal-fade text-[clamp(40px,6vw,64px)] font-bold tracking-headline leading-[1.05] text-center whitespace-pre-line">
          {config.headline}
        </h2>
        <p className="reveal-fade text-[17px] text-content-secondary text-center mt-5 max-w-[480px] mx-auto leading-relaxed" style={{ transitionDelay: '0.08s' }}>
          {config.subhead}
        </p>

        {/* Email compose form */}
        <div className="reveal-fade mt-12" style={{ transitionDelay: '0.16s' }}>
          <EmailCompose email={config.email} web3formsKey={config.web3formsKey} />
        </div>

        {/* Social links */}
        <div className="reveal-fade flex justify-center gap-3 flex-wrap mt-10" style={{ transitionDelay: '0.24s' }}>
          {config.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center gap-2 text-sm font-medium py-3 px-6 rounded-full no-underline transition-all duration-300 hover:scale-[1.04] ${
                link.variant === 'primary'
                  ? 'bg-[var(--btn-primary)] text-white hover:bg-[var(--btn-primary-hover)]'
                  : 'text-content-primary hover:bg-white/[0.14]'
              }`}
              style={link.variant === 'secondary' ? { background: 'var(--tag-bg)' } : undefined}
            >
              <span className="w-4 h-4 shrink-0" dangerouslySetInnerHTML={{ __html: contactIcons[link.icon] || '' }} />
              {link.label}
            </a>
          ))}
        </div>

        {/* Resume download — separate, subtle */}
        <div className="reveal-fade flex justify-center mt-8" style={{ transitionDelay: '0.32s' }}>
          <a
            href="/assets/resume.pdf"
            download="Sai_Sarthak_Mohapatra_Resume.pdf"
            className="inline-flex items-center gap-2 text-sm font-medium py-3 px-7 rounded-full no-underline transition-all duration-300 hover:scale-[1.03] text-content-primary"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
          >
            <svg className="w-4 h-4" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
