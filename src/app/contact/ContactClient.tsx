"use client";
import ContactForm from './contactForm';
import type { ReactElement } from 'react';

// Simple client wrapper that renders the interactive ContactForm. We avoid
// `next/dynamic({ ssr: false })` here to prevent runtime factory/chunk issues
// in dev where dynamic chunk resolution can produce `undefined.call` errors.
export default function ContactClient(): ReactElement {
  return <ContactForm />;
}
