export * from './CodeQualityAudit';
export * from './RefactoringModernization';
export * from './ReliabilityEngineering';
export * from './TestingStrategy';
export * from './CICDHardening';

export const serviceTones = {
  audit: {
    fg: 'text-amber-800 dark:text-amber-200',
    chip: 'from-amber-200 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20',
  },
  refactor: {
    fg: 'text-teal-800 dark:text-teal-200',
    chip: 'from-teal-200 to-teal-50 dark:from-teal-900/30 dark:to-teal-800/20',
  },
  reliab: {
    fg: 'text-indigo-800 dark:text-indigo-200',
    chip: 'from-indigo-200 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/20',
  },
  testing: {
    fg: 'text-violet-800 dark:text-violet-200',
    chip: 'from-violet-200 to-violet-50 dark:from-violet-900/30 dark:to-violet-800/20',
  },
  cicd: {
    fg: 'text-amber-900 dark:text-amber-100',
    chip: 'from-amber-300 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/20',
  },
} as const;
export type ServiceToneKey = keyof typeof serviceTones;
