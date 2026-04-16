'use client';
import type { ReactElement } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { founders } from './founders-data';
import { useLanguage } from '@/lib/LanguageContext';

function CheckIcon(): ReactElement {
  return (
    <svg className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function AboutPage(): ReactElement {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
      {/* Hero header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="eyebrow mb-4">Our Story</div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl">
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            {t('about.title')}
          </span>
        </h1>
        <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed max-w-2xl">
          <p className="text-lg text-foreground/70">{t('about.intro')}</p>
          <p className="text-foreground/65">{t('about.description')}</p>
        </div>
      </motion.header>

      {/* Principles card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="neuro-card rounded-3xl border border-violet-500/20 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-10 mb-16 hover:-translate-y-1 transition-all duration-300"
      >
        <h2 className="text-lg font-semibold mb-6 text-violet-400">{t('about.principles.heading')}</h2>
        <ul className="space-y-5">
          <li className="flex items-start gap-3">
            <CheckIcon />
            <div>
              <strong className="font-semibold">{t('about.principles.correctness.title')}</strong>
              <span className="text-foreground/70"> {t('about.principles.correctness.body')}</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckIcon />
            <div>
              <strong className="font-semibold">{t('about.principles.observability.title')}</strong>
              <span className="text-foreground/70"> {t('about.principles.observability.body')}</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckIcon />
            <div>
              <strong className="font-semibold">{t('about.principles.automation.title')}</strong>
              <span className="text-foreground/70"> {t('about.principles.automation.body')}</span>
            </div>
          </li>
        </ul>
      </motion.div>

      {/* Founders */}
      <section className="mt-4" aria-labelledby="founders-heading">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="eyebrow mb-4">The Team</div>
          <h2 id="founders-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {t('about.founders.heading')}
          </h2>
          <p className="text-base text-foreground/65 max-w-2xl leading-relaxed">
            {t('about.founders.description')}
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12">
          {founders.map((f, index) => {
            const firstName = f.name.split(' ')[0]?.toLowerCase() || 'founder';
            const imageExtension =
              firstName === 'maxwell' || firstName === 'marek' || firstName === 'petras' ? 'jpg' : 'svg';
            const imageSrc = `/images/founders/${firstName}.${imageExtension}`;
            const founderKey = firstName;
            const imagePosition = index % 2 === 0 ? 'right' : 'left';

            return (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="neuro-card shadow-soft rounded-3xl border border-violet-500/15 bg-white/[0.03] backdrop-blur-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
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
                        <p className="text-lg text-violet-400 font-medium">
                          {t(`about.founder.${founderKey}.role`)}
                        </p>
                      </div>
                      <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
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
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-violet-900/20 to-indigo-900/10 opacity-50" aria-hidden="true" />

                    <Image src={imageSrc} alt={f.alt} width={400} height={400} className="w-full h-full object-cover relative z-10" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
