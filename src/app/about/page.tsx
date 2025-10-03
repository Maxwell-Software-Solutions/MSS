import type { Metadata } from 'next';
import AboutPageComponent from './AboutPage';

export const metadata: Metadata = {
  title: 'About — Maxwell Software Solutions',
  description: 'Our mission: correctness, simplicity, observability, automation.',
};

export default function Page(): React.ReactElement {
  return <AboutPageComponent />;
}
