import fs from 'fs';
import path from 'path';

type Language = 'en' | 'lt';

// Cache translations to avoid repeated file reads
const translationsCache: Partial<Record<Language, Record<string, string>>> = {};

/**
 * Load translations for server-side rendering
 * This runs on the server only and caches the results
 */
export async function loadServerTranslations(language: Language): Promise<Record<string, string>> {
  if (translationsCache[language]) {
    return translationsCache[language];
  }

  try {
    const translationsPath = path.join(process.cwd(), 'src', 'lib', 'translations', `${language}.json`);
    const translationsFile = fs.readFileSync(translationsPath, 'utf8');
    const translations = JSON.parse(translationsFile);
    
    translationsCache[language] = translations;
    return translations;
  } catch (error) {
    console.error(`Failed to load server translations for ${language}:`, error);
    return {};
  }
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
    
    // Page titles
    'about.title',
    'blog.title', 
    'services.hero.title',
    
    // Hero content
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
    
    // Service cards (very visible)
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

  const critical: Record<string, string> = {};
  for (const key of criticalKeys) {
    if (translations[key]) {
      critical[key] = translations[key];
    }
  }
  
  return critical;
}