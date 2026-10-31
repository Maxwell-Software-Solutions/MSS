import type { ReactElement, ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/** Column for long-form pages: policies and write-ups. Comfortable reading width, centred on the page. */
export function PageContainer({ children, className = '' }: PageContainerProps): ReactElement {
  return <div className={`article ${className}`.trim()}>{children}</div>;
}

export default PageContainer;
