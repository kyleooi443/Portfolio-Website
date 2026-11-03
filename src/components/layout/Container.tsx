import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`site-container mx-auto ${className}`.trim()}>{children}</div>;
}
