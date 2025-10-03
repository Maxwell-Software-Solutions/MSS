import type { ReactElement } from 'react';
import Image from 'next/image';

export default function SiteFooter(): ReactElement {
  return (
    <footer className="hairline">
      <div className="container section text-sm muted flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-simple.svg"
            alt="Maxwell Software Solutions"
            width={240}
            height={48}
            className="h-9 w-auto opacity-80"
          />
          <span className="text-foreground/60">© {new Date().getFullYear()}</span>
        </div>
        <nav className="flex gap-4">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/security">Security</a>
        </nav>
      </div>
    </footer>
  );
}
