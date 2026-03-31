'use client';

import type { ReactElement } from 'react';
import { useState, useCallback } from 'react';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

// ============================================================================
// Types
// ============================================================================

interface SecurityHeaders {
  'content-security-policy': boolean;
  'x-frame-options': boolean;
  'x-content-type-options': boolean;
  'strict-transport-security': boolean;
  'referrer-policy': boolean;
  'permissions-policy': boolean;
}

interface TechDetection {
  name: string;
  confidence: 'high' | 'medium';
}

interface ServerScanResult {
  ssl: boolean;
  headers: SecurityHeaders;
  tech: TechDetection[];
  metaGenerator: string | null;
  statusCode: number;
}

interface LighthouseCategory {
  score: number | null;
}

interface LighthouseAudit {
  numericValue?: number;
  score?: number | null;
}

interface PageSpeedResult {
  lighthouseResult?: {
    categories?: {
      performance?: LighthouseCategory;
      accessibility?: LighthouseCategory;
      seo?: LighthouseCategory;
    };
    audits?: {
      'largest-contentful-paint'?: LighthouseAudit;
      'total-blocking-time'?: LighthouseAudit;
      'cumulative-layout-shift'?: LighthouseAudit;
      'first-contentful-paint'?: LighthouseAudit;
      'speed-index'?: LighthouseAudit;
    };
  };
}

interface ScanResults {
  url: string;
  overallScore: number;
  performance: {
    score: number;
    lcp: number | null;
    tbt: number | null;
    cls: number | null;
    fcp: number | null;
  };
  accessibility: { score: number };
  seo: { score: number };
  security: {
    ssl: boolean;
    headers: SecurityHeaders;
    score: number;
  };
  tech: TechDetection[];
  metaGenerator: string | null;
}

type ScanPhase = 'idle' | 'security' | 'performance' | 'done';

// ============================================================================
// Helpers
// ============================================================================

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  return url;
}

function scoreColor(score: number): string {
  if (score >= 90) return 'text-green-400';
  if (score >= 50) return 'text-yellow-400';
  return 'text-red-400';
}

function scoreBg(score: number): string {
  if (score >= 90) return 'bg-green-400/10 border-green-400/30';
  if (score >= 50) return 'bg-yellow-400/10 border-yellow-400/30';
  return 'bg-red-400/10 border-red-400/30';
}

function scoreLabel(score: number, ht: (k: string, f: string) => string): string {
  if (score >= 90) return ht('scanner.score.good', 'Good');
  if (score >= 50) return ht('scanner.score.needsWork', 'Needs Work');
  return ht('scanner.score.poor', 'Poor');
}

function calcSecurityScore(ssl: boolean, headers: SecurityHeaders): number {
  const headerCount = Object.values(headers).filter(Boolean).length;
  const sslPoints = ssl ? 40 : 0;
  const headerPoints = (headerCount / 6) * 60;
  return Math.round(sslPoints + headerPoints);
}

function formatMs(ms: number | null): string {
  if (ms === null) return '—';
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

function formatCls(cls: number | null): string {
  if (cls === null) return '—';
  return cls.toFixed(3);
}

// ============================================================================
// Sub-components
// ============================================================================

function ScoreRing({ score, size = 120 }: { score: number; size?: number }): ReactElement {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-foreground/10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <span className="absolute text-2xl font-bold" style={{ color }}>{score}</span>
    </div>
  );
}

function MetricCard({ label, value, status }: { label: string; value: string; status: 'good' | 'warn' | 'poor' }): ReactElement {
  const colors = {
    good: 'text-green-400',
    warn: 'text-yellow-400',
    poor: 'text-red-400',
  };
  return (
    <div className="rounded-xl border border-border bg-card/60 p-4">
      <p className="text-[12px] text-foreground/50 mb-1">{label}</p>
      <p className={`text-lg font-semibold ${colors[status]}`}>{value}</p>
    </div>
  );
}

function HeaderRow({ name, present, ht }: { name: string; present: boolean; ht: (k: string, f: string) => string }): ReactElement {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <code className="text-[13px] text-foreground/80">{name}</code>
      {present ? (
        <span className="text-green-400 text-[12px] font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          {ht('scanner.present', 'Present')}
        </span>
      ) : (
        <span className="text-red-400 text-[12px] font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          {ht('scanner.missing', 'Missing')}
        </span>
      )}
    </div>
  );
}

function SectionCard({ title, description, score, children }: { title: string; description: string; score?: number; children: React.ReactNode }): ReactElement {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-[13px] text-foreground/50 mt-1">{description}</p>
        </div>
        {score !== undefined && (
          <span className={`text-2xl font-bold ${scoreColor(score)}`}>{score}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function ProgressBar({ phase, ht }: { phase: ScanPhase; ht: (k: string, f: string) => string }): ReactElement {
  const steps = [
    { key: 'security', label: ht('scanner.step.security', 'Security & Headers') },
    { key: 'performance', label: ht('scanner.step.performance', 'Performance & SEO') },
  ];
  const currentIndex = phase === 'security' ? 0 : phase === 'performance' ? 1 : 2;

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-4">
        {steps.map((step, i) => (
          <div key={step.key} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors ${
              i < currentIndex ? 'bg-green-400/20 text-green-400' :
              i === currentIndex ? 'bg-accent/20 text-accent animate-pulse' :
              'bg-foreground/10 text-foreground/40'
            }`}>
              {i < currentIndex ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-[13px] ${i <= currentIndex ? 'text-foreground/80' : 'text-foreground/40'}`}>{step.label}</span>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-border ml-2" />}
          </div>
        ))}
      </div>
      <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
        <div className="h-full bg-accent rounded-full transition-all duration-700 ease-out" style={{ width: `${(currentIndex / steps.length) * 100}%` }} />
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export default function WebsiteScannerPage(): ReactElement {
  const ht = useHydratedTranslation();
  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState<ScanPhase>('idle');
  const [results, setResults] = useState<ScanResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runScan = useCallback(async () => {
    const normalizedUrl = normalizeUrl(url);
    setError(null);
    setResults(null);
    setPhase('security');

    try {
      // Phase 1: Security scan via API route
      const scanRes = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      if (!scanRes.ok) {
        const data = await scanRes.json();
        throw new Error(data.error || 'Scan failed');
      }

      const serverResult: ServerScanResult = await scanRes.json();
      const securityScore = calcSecurityScore(serverResult.ssl, serverResult.headers);

      setPhase('performance');

      // Phase 2: PageSpeed Insights API
      let perfScore = 0;
      let accessibilityScore = 0;
      let seoScore = 0;
      let lcp: number | null = null;
      let tbt: number | null = null;
      let cls: number | null = null;
      let fcp: number | null = null;

      try {
        const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalizedUrl)}&category=PERFORMANCE&category=ACCESSIBILITY&category=SEO`;
        const psiRes = await fetch(psiUrl);

        if (psiRes.ok) {
          const psiData: PageSpeedResult = await psiRes.json();
          const cats = psiData.lighthouseResult?.categories;
          const audits = psiData.lighthouseResult?.audits;

          perfScore = Math.round((cats?.performance?.score ?? 0) * 100);
          accessibilityScore = Math.round((cats?.accessibility?.score ?? 0) * 100);
          seoScore = Math.round((cats?.seo?.score ?? 0) * 100);

          lcp = audits?.['largest-contentful-paint']?.numericValue ?? null;
          tbt = audits?.['total-blocking-time']?.numericValue ?? null;
          cls = audits?.['cumulative-layout-shift']?.numericValue ?? null;
          fcp = audits?.['first-contentful-paint']?.numericValue ?? null;
        }
      } catch {
        // PageSpeed API failure is non-fatal — we still show security results
      }

      const overallScore = Math.round(
        perfScore * 0.3 + seoScore * 0.25 + accessibilityScore * 0.25 + securityScore * 0.2
      );

      setResults({
        url: normalizedUrl,
        overallScore,
        performance: { score: perfScore, lcp, tbt, cls, fcp },
        accessibility: { score: accessibilityScore },
        seo: { score: seoScore },
        security: { ssl: serverResult.ssl, headers: serverResult.headers, score: securityScore },
        tech: serverResult.tech,
        metaGenerator: serverResult.metaGenerator,
      });

      setPhase('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setPhase('idle');
    }
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) runScan();
  };

  const isScanning = phase !== 'idle' && phase !== 'done';

  return (
    <>
      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 sm:px-10 pt-14 sm:pt-18 pb-8">
        <p className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3 uppercase" suppressHydrationWarning>
          {ht('scanner.eyebrow', 'Free Tool')}
        </p>
        <h1 className="font-semibold leading-[1.1] max-w-3xl text-[clamp(34px,3.4vw,52px)]" suppressHydrationWarning>
          {ht('scanner.headline', 'Website Health Scanner')}
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.65] text-[--muted]" suppressHydrationWarning>
          {ht('scanner.subheadline', 'Analyze any website for performance, security, SEO, and accessibility issues. Get actionable insights in seconds.')}
        </p>
      </header>

      {/* Scanner Input */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-10">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={isScanning}
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3.5 text-[14px] placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-accent/40 transition disabled:opacity-50"
            aria-label={ht('scanner.input.aria', 'Enter website URL to scan')}
          />
          <button
            type="submit"
            disabled={isScanning || !url.trim()}
            className="bg-accent text-white rounded-xl px-8 py-3.5 text-sm font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            suppressHydrationWarning
          >
            {isScanning
              ? ht('scanner.scanning', 'Scanning...')
              : ht('scanner.cta', 'Scan Website')}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-[14px] text-red-400">
            {error}
          </div>
        )}
      </section>

      {/* Progress */}
      {isScanning && (
        <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-12">
          <ProgressBar phase={phase} ht={ht} />
          <p className="text-center text-[13px] text-foreground/50 mt-4" suppressHydrationWarning>
            {phase === 'security'
              ? ht('scanner.progress.security', 'Checking security headers and SSL...')
              : ht('scanner.progress.performance', 'Running performance analysis (this may take 30-60 seconds)...')}
          </p>
        </section>
      )}

      {/* Results */}
      {results && phase === 'done' && (
        <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-16">
          {/* Overall Score */}
          <div className="text-center mb-12">
            <ScoreRing score={results.overallScore} size={140} />
            <p className={`text-lg font-semibold mt-3 ${scoreColor(results.overallScore)}`} suppressHydrationWarning>
              {scoreLabel(results.overallScore, ht)}
            </p>
            <p className="text-[13px] text-foreground/50 mt-1">
              {results.url}
            </p>
          </div>

          {/* Score Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: ht('scanner.category.performance', 'Performance'), score: results.performance.score },
              { label: ht('scanner.category.seo', 'SEO'), score: results.seo.score },
              { label: ht('scanner.category.accessibility', 'Accessibility'), score: results.accessibility.score },
              { label: ht('scanner.category.security', 'Security'), score: results.security.score },
            ].map((cat) => (
              <div key={cat.label} className={`rounded-xl border p-4 text-center ${scoreBg(cat.score)}`}>
                <p className="text-[12px] text-foreground/50 mb-1">{cat.label}</p>
                <p className={`text-2xl font-bold ${scoreColor(cat.score)}`}>{cat.score}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance */}
            <SectionCard
              title={ht('scanner.perf.title', 'Performance')}
              description={ht('scanner.perf.desc', 'Core Web Vitals measure real-world user experience. Google uses these as ranking signals.')}
              score={results.performance.score}
            >
              <div className="grid grid-cols-2 gap-3">
                <MetricCard
                  label="LCP (Largest Contentful Paint)"
                  value={formatMs(results.performance.lcp)}
                  status={results.performance.lcp === null ? 'warn' : results.performance.lcp <= 2500 ? 'good' : results.performance.lcp <= 4000 ? 'warn' : 'poor'}
                />
                <MetricCard
                  label="TBT (Total Blocking Time)"
                  value={formatMs(results.performance.tbt)}
                  status={results.performance.tbt === null ? 'warn' : results.performance.tbt <= 200 ? 'good' : results.performance.tbt <= 600 ? 'warn' : 'poor'}
                />
                <MetricCard
                  label="CLS (Cumulative Layout Shift)"
                  value={formatCls(results.performance.cls)}
                  status={results.performance.cls === null ? 'warn' : results.performance.cls <= 0.1 ? 'good' : results.performance.cls <= 0.25 ? 'warn' : 'poor'}
                />
                <MetricCard
                  label="FCP (First Contentful Paint)"
                  value={formatMs(results.performance.fcp)}
                  status={results.performance.fcp === null ? 'warn' : results.performance.fcp <= 1800 ? 'good' : results.performance.fcp <= 3000 ? 'warn' : 'poor'}
                />
              </div>
            </SectionCard>

            {/* Security */}
            <SectionCard
              title={ht('scanner.security.title', 'Security')}
              description={ht('scanner.security.desc', 'Security headers protect against common web attacks like XSS, clickjacking, and data injection.')}
              score={results.security.score}
            >
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[13px] font-medium ${results.security.ssl ? 'text-green-400' : 'text-red-400'}`}>
                    {results.security.ssl
                      ? ht('scanner.ssl.secure', 'SSL/HTTPS: Secure')
                      : ht('scanner.ssl.insecure', 'SSL/HTTPS: Not Secure')}
                  </span>
                </div>
                {Object.entries(results.security.headers).map(([name, present]) => (
                  <HeaderRow key={name} name={name} present={present} ht={ht} />
                ))}
              </div>
            </SectionCard>

            {/* SEO */}
            <SectionCard
              title={ht('scanner.seo.title', 'SEO')}
              description={ht('scanner.seo.desc', 'SEO score reflects how well the page follows search engine optimization best practices.')}
              score={results.seo.score}
            >
              <div className={`rounded-xl border p-4 ${scoreBg(results.seo.score)}`}>
                <p className={`text-lg font-semibold ${scoreColor(results.seo.score)}`} suppressHydrationWarning>
                  {results.seo.score >= 90
                    ? ht('scanner.seo.good', 'Strong SEO foundation. Well optimized for search engines.')
                    : results.seo.score >= 50
                    ? ht('scanner.seo.ok', 'Decent SEO but there is room for improvement.')
                    : ht('scanner.seo.poor', 'Significant SEO issues found. This site may struggle to rank.')}
                </p>
              </div>
            </SectionCard>

            {/* Accessibility */}
            <SectionCard
              title={ht('scanner.a11y.title', 'Accessibility')}
              description={ht('scanner.a11y.desc', 'Accessibility ensures your website is usable by everyone, including people with disabilities.')}
              score={results.accessibility.score}
            >
              <div className={`rounded-xl border p-4 ${scoreBg(results.accessibility.score)}`}>
                <p className={`text-lg font-semibold ${scoreColor(results.accessibility.score)}`} suppressHydrationWarning>
                  {results.accessibility.score >= 90
                    ? ht('scanner.a11y.good', 'Good accessibility. Most users should have a smooth experience.')
                    : results.accessibility.score >= 50
                    ? ht('scanner.a11y.ok', 'Some accessibility issues found that should be addressed.')
                    : ht('scanner.a11y.poor', 'Serious accessibility barriers detected. Many users may be excluded.')}
                </p>
              </div>
            </SectionCard>
          </div>

          {/* Tech Detection */}
          {(results.tech.length > 0 || results.metaGenerator) && (
            <div className="mt-6 rounded-2xl border border-border bg-card/60 p-6">
              <h3 className="text-lg font-semibold mb-1" suppressHydrationWarning>
                {ht('scanner.tech.title', 'Detected Technologies')}
              </h3>
              <p className="text-[13px] text-foreground/50 mb-4" suppressHydrationWarning>
                {ht('scanner.tech.desc', 'Frameworks and libraries detected from the page source.')}
              </p>
              <div className="flex flex-wrap gap-2">
                {results.metaGenerator && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 text-accent text-[12px] font-semibold px-3 py-1.5">
                    {results.metaGenerator}
                  </span>
                )}
                {results.tech.map((t) => (
                  <span
                    key={t.name}
                    className={`inline-flex items-center gap-1.5 rounded-full text-[12px] font-semibold px-3 py-1.5 ${
                      t.confidence === 'high'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-foreground/5 text-foreground/70'
                    }`}
                  >
                    {t.name}
                    {t.confidence === 'medium' && (
                      <span className="text-[10px] text-foreground/40">?</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-3xl border border-accent/20 bg-accent/5 p-8 sm:p-12 text-center">
            <p className="text-[12px] font-bold uppercase tracking-widest text-accent/70 mb-3" suppressHydrationWarning>
              {ht('scanner.cta.eyebrow', 'Go Deeper')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4" suppressHydrationWarning>
              {ht('scanner.cta.title', 'Want a deeper analysis?')}
            </h2>
            <p className="text-[15px] text-foreground/70 max-w-xl mx-auto mb-6" suppressHydrationWarning>
              {ht('scanner.cta.body', 'Book a free 15-minute expert review with Maxwell Software Solutions. We will walk through your results and identify the highest-impact fixes.')}
            </p>
            <a
              href="https://calendly.com/maxwellsoftwaresolutions/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white rounded-xl px-8 py-3.5 text-sm font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
              suppressHydrationWarning
            >
              {ht('scanner.cta.button', 'Book Free Expert Review')}
            </a>
          </div>
        </section>
      )}

      {/* How it works (shown before scan) */}
      {phase === 'idle' && !results && (
        <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-16">
          <h2 className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-8 text-center" suppressHydrationWarning>
            {ht('scanner.how.heading', 'What we check')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '⚡',
                title: ht('scanner.how.perf.title', 'Performance'),
                desc: ht('scanner.how.perf.desc', 'Core Web Vitals — LCP, TBT, CLS, and FCP. Powered by Google PageSpeed Insights.'),
              },
              {
                icon: '🔒',
                title: ht('scanner.how.security.title', 'Security'),
                desc: ht('scanner.how.security.desc', 'SSL certificate and 6 critical security headers that protect against common attacks.'),
              },
              {
                icon: '🔍',
                title: ht('scanner.how.seo.title', 'SEO'),
                desc: ht('scanner.how.seo.desc', 'Search engine optimization audit covering meta tags, structure, and best practices.'),
              },
              {
                icon: '♿',
                title: ht('scanner.how.a11y.title', 'Accessibility'),
                desc: ht('scanner.how.a11y.desc', 'WCAG compliance check ensuring your site is usable by everyone.'),
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card/60 p-6 text-center">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="text-[15px] font-semibold mb-2">{item.title}</h3>
                <p className="text-[13px] text-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
