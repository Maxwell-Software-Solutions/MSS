import type { Metadata } from 'next';
import ServicesPage from './ServicesPage';

export const metadata: Metadata = {
  title: 'Services — Maxwell Software Solutions',
  description: 'Code quality audits, reliability engineering, testing strategy, and CI/CD hardening.',
  alternates: {
    canonical: '/services',
  },
};

export default ServicesPage;
