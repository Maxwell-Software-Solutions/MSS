import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import ContactForm from './contactForm';

export const metadata: Metadata = {
  title: 'Contact — Maxwell Software Solutions',
  description: 'Request a code audit or book a consultation.',
};

export default function ContactPage(): ReactElement {
  return (
    <div>
      <ContactForm />
    </div>
  );
}
