import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ShareButton } from './ShareButton';

// iOS navigation bar for detail pages: the compact title fades in as the large title scrolls away (CSS scroll timeline).
export function PageBar({ backHref, backLabel, title }: { backHref: string; backLabel: string; title: string }) {
  return <header className="page-bar">
    <Link className="page-bar-back glass" href={backHref} aria-label={`Back to ${backLabel.toLowerCase()}`}><ChevronLeft size={22} aria-hidden="true" />{backLabel}</Link>
    <span className="page-bar-title" aria-hidden="true">{title}</span>
    <ShareButton title={title} />
  </header>;
}
