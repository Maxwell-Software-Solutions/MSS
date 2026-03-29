'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactElement } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { CONTACT_EMAIL } from '@/app/contact/contact.constants';

const SESSION_KEY = 'exit_intent_shown';

export default function ExitIntentPopup(): ReactElement | null {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const lastScrollY = useRef(0);
  const triggered = useRef(false);

  const show = useCallback(() => {
    if (triggered.current) return;
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) return;
    triggered.current = true;
    sessionStorage.setItem(SESSION_KEY, '1');
    setVisible(true);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    // Desktop: mouseleave toward top of viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 8) {
        show();
      }
    };

    // Mobile: rapid upward scroll (velocity > 80px in one tick)
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = lastScrollY.current - currentY;
      lastScrollY.current = currentY;
      if (delta > 80 && currentY > 200) {
        show();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [show]);

  // Keyboard: dismiss on Escape
  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [visible, dismiss]);

  // Trap focus inside modal when open
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (visible) {
      dialogRef.current?.focus();
    }
  }, [visible]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const subject = encodeURIComponent('Free Code Health Audit Report Request');
      const body = encodeURIComponent(`Please send me the free Code Health Audit report.\n\nEmail: ${email}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setSubmitted(true);
      setTimeout(() => setVisible(false), 2500);
    },
    [email],
  );

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="exit-intent-backdrop"
        aria-hidden="true"
        onClick={dismiss}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        aria-describedby="exit-intent-desc"
        tabIndex={-1}
        className="exit-intent-dialog"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={dismiss}
          aria-label={t('exitIntent.close')}
          className="exit-intent-close"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Accent bar */}
        <div className="exit-intent-accent" aria-hidden="true" />

        {!submitted ? (
          <>
            <p id="exit-intent-title" className="exit-intent-title">
              {t('exitIntent.title')}
              <span className="exit-intent-title-highlight"> {t('exitIntent.subtitle')}</span>
            </p>
            <p id="exit-intent-desc" className="exit-intent-desc">
              {t('exitIntent.description')}
            </p>

            <form onSubmit={handleSubmit} className="exit-intent-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('exitIntent.emailPlaceholder')}
                aria-label={t('exitIntent.emailPlaceholder')}
                className="exit-intent-input"
              />
              <button type="submit" className="exit-intent-btn">
                {t('exitIntent.cta')}
              </button>
            </form>

            <button type="button" onClick={dismiss} className="exit-intent-dismiss">
              {t('exitIntent.dismiss')}
            </button>
          </>
        ) : (
          <div className="exit-intent-success" role="status">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="20" fill="var(--color-accent)" opacity="0.15" />
              <path d="M12 20l6 6 10-12" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="exit-intent-success-text">Opening your email client&hellip;</p>
          </div>
        )}
      </div>
    </>
  );
}
