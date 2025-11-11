'use client';
import type { ReactElement } from 'react';
import { founders } from './founders-data';
import { useLanguage } from '@/lib/LanguageContext';
import { Card } from '@/app/components/ui';

export default function AboutPage(): ReactElement {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold">{t('about.title')}</h1>
      <div className="mt-6 space-y-6 text-foreground/85 leading-relaxed">
        <p className="text-lg">{t('about.intro')}</p>
        <p>{t('about.description')}</p>
        <Card padding="md" className="mt-8 bg-accent/5 border-accent/30">
          <h2 className="text-lg font-semibold mb-4 text-accent">{t('about.principles.heading')}</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-0.5 flex-shrink-0" aria-hidden="true">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <strong className="font-semibold">{t('about.principles.correctness.title')}</strong>
                <span className="text-foreground/75"> {t('about.principles.correctness.body')}</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-0.5 flex-shrink-0" aria-hidden="true">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <strong className="font-semibold">{t('about.principles.observability.title')}</strong>
                <span className="text-foreground/75"> {t('about.principles.observability.body')}</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-0.5 flex-shrink-0" aria-hidden="true">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <strong className="font-semibold">{t('about.principles.automation.title')}</strong>
                <span className="text-foreground/75"> {t('about.principles.automation.body')}</span>
              </div>
            </li>
          </ul>
        </Card>
      </div>
      <section className="mt-12 sm:mt-16" aria-labelledby="founders-heading">
        <h2 id="founders-heading" className="text-3xl font-semibold tracking-tight mb-4">
          {t('about.founders.heading')}
        </h2>
        <p className="mt-4 text-base text-foreground/75 max-w-2xl leading-relaxed mb-8 sm:mb-12">
          {t('about.founders.description')}
        </p>
        <div className="space-y-8 sm:space-y-12">
          {founders.map((f, index) => {
            const firstName = f.name.split(' ')[0]?.toLowerCase() || 'founder';
            const imageExtension =
              firstName === 'maxwell' || firstName === 'marek' || firstName === 'petras' ? 'jpg' : 'svg';
            const imageSrc = `/images/founders/${firstName}.${imageExtension}`;
            const founderKey = firstName;
            const imagePosition = index % 2 === 0 ? 'right' : 'left';

            return (
              <div
                key={f.name}
                className="neuro-card shadow-soft rounded-3xl border bg-card/95 backdrop-blur-xl transition hover:shadow-lg overflow-hidden"
              >
                <div
                  className={`grid grid-cols-1 ${
                    imagePosition === 'right' ? 'lg:grid-cols-[1.5fr_1fr]' : 'lg:grid-cols-[1fr_1.5fr]'
                  } gap-0`}
                >
                  {/* Description Section */}
                  <div
                    className={`flex flex-col justify-center p-8 sm:p-12 ${
                      imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                          {t(`about.founder.${founderKey}.name`)}
                        </h3>
                        <p className="text-xl text-foreground/80 font-medium">
                          {t(`about.founder.${founderKey}.role`)}
                        </p>
                      </div>
                      <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
                        {t(`about.founder.${founderKey}.bio`)}
                      </p>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div
                    className={`relative flex items-center justify-center p-8 sm:p-12 ${
                      imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div
                      className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${f.gradient} opacity-10`}
                      aria-hidden="true"
                    />

                    <img src={imageSrc} alt={f.alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
