import type { ReactElement } from 'react';

interface CTAProps {
  title: string;
  body: string;
  primary: { href: string; label: string; ariaLabel?: string };
  secondary?: { href: string; label: string; ariaLabel?: string };
}

export function CTA({ title, body, primary, secondary }: CTAProps): ReactElement {
  return (
    <section className="mt-24">
      <div className="relative rounded-3xl border border-[--border] bg-white/70 dark:bg-white/5 backdrop-blur supports-[backdrop-filter]:shadow-lg px-8 py-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35] bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.6),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[--muted]">{body}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={primary.href}
              aria-label={primary.ariaLabel || primary.label}
              className="btn btn-accent px-10 py-3 text-base shadow-soft focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
            >
              {primary.label}
            </a>
            {secondary && (
              <a
                href={secondary.href}
                aria-label={secondary.ariaLabel || secondary.label}
                className="btn btn-ghost px-10 py-3 text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
              >
                {secondary.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
