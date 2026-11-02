import en from './translations/en.json';
import lt from './translations/lt.json';

type Language = 'en' | 'lt';

// Imported rather than read from disk: Vercel's server functions don't ship src/, so a file read returned nothing
const bundledTranslations: Record<Language, Record<string, string>> = { en, lt };

/**
 * Load translations for server-side rendering
 */
export async function loadServerTranslations(language: Language): Promise<Record<string, string>> {
  return bundledTranslations[language] ?? {};
}

/**
 * Get critical translations for server-side injection
 * These are the most visible keys that cause jarring flashes
 */
export function getCriticalTranslations(translations: Record<string, string>): Record<string, string> {
  const criticalKeys = [
    // Navigation (highest priority - visible on every page)
    'nav.services',
    'nav.caseStudies',
    'nav.about',
    'nav.blog',
    'nav.founders',
    'nav.pricing',
    'cta.scheduleCall',
    'cta.bookCall',
    'cta.bookCall.aria',
    'footer.tagline',
    'footer.description',

    // Footer: provider details and legal links, on every page
    'footer.privacy',
    'footer.terms',
    'footer.security',
    'footer.cookieSettings',
    'footer.cookieUnavailable',
    'footer.legal.heading',
    'footer.legal.code',
    'footer.legal.register',
    'footer.legal.office',
    'footer.legal.country',
    'footer.legal.email',

    // Homepage hero (P0 — must render server-side for Google to see H1)
    'hero.title',
    'hero.subtitle',
    'hero.subtitle.short',
    'hero.cta.primary',
    'hero.cta.secondary',
    'hero.values',
    'hero.motion.pause',
    'hero.motion.play',
    'hero.calendly.cta',
    'hero.calendly.aria',

    // Homepage film after the hero
    'promoFilm.heading',
    'promoFilm.playWithSound',
    'promoFilm.play',
    'promoFilm.pause',
    'promoFilm.soundOn',
    'promoFilm.soundOff',
    'promoFilm.watchAgain',


    // Homepage engineering foundation
    'value.evals.title',
    'value.evals.body',
    'value.foundations.title',
    'value.foundations.body',
    'value.monitoring.title',
    'value.monitoring.body',
    'value.rollout.title',
    'value.rollout.body',
    'value.label',

    // Homepage AI services
    'capabilities.eyebrow',
    'capabilities.heading',
    'capabilities.description',
    'capabilities.description.short',
    'capabilities.adoption.title',
    'capabilities.adoption.body',
    'capabilities.agents.title',
    'capabilities.agents.body',
    'capabilities.products.title',
    'capabilities.products.body',
    'capabilities.innovation.title',
    'capabilities.innovation.body',

    // Homepage AI agents
    'showcase.heading',
    'showcase.description',
    'showcase.description.short',
    'showcase.connected.title',
    'showcase.connected.body',
    'showcase.control.title',
    'showcase.control.body',
    'showcase.measured.title',
    'showcase.measured.body',

    // Homepage closing call to action
    'finalCta.heading',
    'finalCta.body',
    'finalCta.body.short',
    'finalCta.primary',
    'finalCta.secondary',

    // Homepage about section
    'about.section.heading',
    'about.section.description',
    'about.section.cta',

    // Homepage process section
    'process.heading',
    'process.step1.title',
    'process.step1.body',
    'process.step2.title',
    'process.step2.body',
    'process.step3.title',
    'process.step3.body',
    'process.step4.title',
    'process.step4.body',

    // Real AI work (home page and case studies page) and the founder note
    'realWork.eyebrow',
    'realWork.heading',
    'realWork.lead',
    'realWork.lead.short',
    'realWork.newTab',
    'realWork.irwin.meta',
    'realWork.irwin.title',
    'realWork.irwin.body',
    'realWork.irwin.note',
    'realWork.cattery.meta',
    'realWork.cattery.title',
    'realWork.cattery.body',
    'realWork.orchestrator.meta',
    'realWork.orchestrator.title',
    'realWork.orchestrator.body',
    'realWork.neonova.meta',
    'realWork.neonova.title',
    'realWork.neonova.body',
    'realWork.founder.label',
    'realWork.founder.lead',
    'realWork.founder.about',

    // Homepage contact section
    'contact.heading',
    'contact.description',
    'contact.description.short',
    'contact.cta.primary',
    'contact.cta.secondary',
    'contact.linkedin.label',
    'contact.linkedin.company',

    // Page titles
    'about.title',
    'blog.title',
    'services.hero.title',

    // Hero content
    'about.eyebrow',
    'about.team.eyebrow',
    'about.intro',
    'about.description',
    'blog.subtitle',
    'services.hero.subtitle',
    'services.hero.description',
    
    // Section headings
    'about.principles.heading',
    'about.founders.heading',
    'about.founders.description',
    'services.heading',
    'services.description',
    'services.process.heading',
    'services.process.description',
    'services.hero.eyebrow',
    'services.hero.note',
    
    // Services CTA
    'services.cta.title',
    'services.cta.body', 
    'services.cta.primary',
    'services.cta.secondary',
    
    // AI service cards (lead the page)
    'services.ai.heading',
    'services.ai.description',
    'services.adoption.title',
    'services.adoption.body',
    'services.adoption.tagline',
    'services.agents.title',
    'services.agents.body',
    'services.agents.tagline',
    'services.product.title',
    'services.product.body',
    'services.product.tagline',
    'services.prototype.title',
    'services.prototype.body',
    'services.prototype.tagline',

    // Engineering service cards
    'services.audit.title',
    'services.audit.body',
    'services.audit.tagline',
    'services.refactor.title',
    'services.refactor.body', 
    'services.refactor.tagline',
    'services.reliability.title',
    'services.reliability.body',
    'services.reliability.tagline',
    'services.testing.title',
    'services.testing.body',
    'services.testing.tagline',
    'services.cicd.title',
    'services.cicd.body',
    'services.cicd.tagline',
    
    // Process timeline steps
    'services.process.discover.title',
    'services.process.discover.body',
    'services.process.audit.title', 
    'services.process.audit.body',
    'services.process.plan.title',
    'services.process.plan.body',
    'services.process.implement.title',
    'services.process.implement.body',
    'services.process.sustain.title',
    'services.process.sustain.body',
    
    // Founder names and roles (most visible in cards)
    'about.founder.mantas.name',
    'about.founder.mantas.role',
    'about.founder.mantas.bio',
    'about.founder.maxwell.name',
    'about.founder.maxwell.role', 
    'about.founder.maxwell.bio',
    'about.founder.petras.name',
    'about.founder.petras.role',
    'about.founder.petras.bio', 
    'about.founder.marek.name',
    'about.founder.marek.role',
    'about.founder.marek.bio',
    
    // Blog content - all blog translations
    'blog.title',
    'blog.subtitle',
    'blog.readMore',
    'blog.minRead',
    'blog.solid.date',
    'blog.solid.duration',
    'blog.solid.category',
    'blog.solid.title',
    'blog.solid.excerpt',
    'blog.tdd.date',
    'blog.tdd.duration',
    'blog.tdd.category',
    'blog.tdd.title', 
    'blog.tdd.excerpt',
    'blog.refactoring.date',
    'blog.refactoring.duration',
    'blog.refactoring.category',
    'blog.refactoring.title',
    'blog.refactoring.excerpt',
    'blog.api.date',
    'blog.api.duration',
    'blog.api.category',
    'blog.api.title',
    'blog.api.excerpt',
    'blog.microservices.date',
    'blog.microservices.duration',
    'blog.microservices.category',
    'blog.microservices.title',
    'blog.microservices.excerpt',
    'blog.cicd.date',
    'blog.cicd.duration',
    'blog.cicd.category',
    'blog.cicd.title',
    'blog.cicd.excerpt',
    
    // Principles
    'about.principles.correctness.title',
    'about.principles.correctness.body',
    'about.principles.observability.title', 
    'about.principles.observability.body',
    'about.principles.automation.title',
    'about.principles.automation.body',
  ];

  // Whole groups for pages that read keys without a fallback, so their server HTML never shows a raw key
  const criticalPrefixes = ['contactPage.', 'contactForm.', 'blog.', 'footer.'];

  const critical: Record<string, string> = {};
  for (const key of criticalKeys) {
    if (translations[key]) {
      critical[key] = translations[key];
    }
  }
  for (const [key, value] of Object.entries(translations)) {
    if (value && criticalPrefixes.some((prefix) => key.startsWith(prefix))) critical[key] = value;
  }

  return critical;
}
