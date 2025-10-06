import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact — Maxwell Software Solutions',
  description: 'Request a code audit or book a consultation.',
};

export default function ContactPage(): ReactElement {
  return <ContactClient />;
}
