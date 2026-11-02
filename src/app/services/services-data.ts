export interface ServiceItem {
  key: string;
  title: string;
  icon: string; // symbolic key referencing internal SVG component
  alt: string; // accessible label
  body: string;
  tagline: string;
  featured?: boolean;
}

/** The four AI services, which lead the page. */
export const aiServices: ServiceItem[] = [
  {
    key: 'adoption',
    title: 'AI adoption and strategy',
    icon: 'adoption',
    alt: 'AI adoption icon',
    body: 'We find the use cases worth doing, assess your data and systems for readiness, and set out a roadmap with governance and training for your team.',
    tagline: 'Clear priorities before you spend',
  },
  {
    key: 'agents',
    title: 'AI agents and automation',
    icon: 'agents',
    alt: 'AI agents icon',
    body: 'Agentic workflows connected to your business systems, from CRM and ERP to documents and ticketing, with people approving the steps that matter.',
    tagline: 'Real work, under your control',
    featured: true,
  },
  {
    key: 'product',
    title: 'AI product development',
    icon: 'product',
    alt: 'AI product icon',
    body: 'LLM features, knowledge assistants and AI integrations, built on the major model providers, or on open and local models when your data must stay in-house.',
    tagline: 'From feature to product',
  },
  {
    key: 'prototype',
    title: 'AI innovation and prototyping',
    icon: 'prototype',
    alt: 'AI prototyping icon',
    body: 'A working proof of concept in weeks, so you can test a new idea with real users and real data before committing to a full build.',
    tagline: 'Proof in weeks',
  },
];

/** Engineering services: the foundation that makes AI production-grade, and useful for any codebase. */
export const services: ServiceItem[] = [
  {
    key: 'audit',
    title: 'Code and AI readiness audit',
    icon: 'audit',
    alt: 'Audit icon',
    body: 'Static analysis, architecture review and test coverage mapping, with a prioritised plan that shows what to fix before AI goes in.',
    tagline: 'Fast insight, clear roadmap',
  },
  {
    key: 'testing',
    title: 'Testing and AI evaluations',
    icon: 'testing',
    alt: 'Testing icon',
    body: 'A practical test pyramid, flaky test control and evaluation sets for AI features, so model and prompt changes are checked like any other code.',
    tagline: 'Confidence you can measure',
  },
  {
    key: 'refactor',
    title: 'Refactoring and modernisation',
    icon: 'refactor',
    alt: 'Refactoring icon',
    body: 'Pay down technical debt step by step and give AI features clean interfaces and reliable data to work with.',
    tagline: 'Less drag, more flow',
  },
  {
    key: 'reliability',
    title: 'Reliability and monitoring',
    icon: 'reliability',
    alt: 'Reliability icon',
    body: 'SLOs, error budgets, tracing and incident drills, extended to AI: quality, latency and cost tracked in production.',
    tagline: 'Stability you can prove',
  },
  {
    key: 'cicd',
    title: 'CI/CD and safe rollout',
    icon: 'cicd',
    alt: 'CI/CD icon',
    body: 'Fast pipelines with quality gates, preview environments and staged releases, so new AI behaviour ships under control.',
    tagline: 'Ship faster, safer',
  },
];
