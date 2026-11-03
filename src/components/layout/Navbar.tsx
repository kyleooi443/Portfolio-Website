'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from './Container';

const links = [
  { label: 'About', hash: 'about' },
  { label: 'Projects', hash: 'projects' },
  { label: 'Notes', hash: 'notes' },
  { label: 'Contact', hash: 'contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <Container className="nav-inner flex items-center justify-between">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)} aria-label="Kyle, home">kyle<span>.</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(({ label, hash }) => <Link key={hash} href={`/#${hash}`} aria-current={pathname.startsWith(`/${hash}`) ? 'page' : undefined}>{label}</Link>)}
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </Container>
      <nav id="mobile-navigation" className={`mobile-nav${open ? ' is-open' : ''}`} aria-label="Mobile navigation" inert={!open}>
        <Container>
          {links.map(({ label, hash }) => <Link key={hash} href={`/#${hash}`} onClick={() => setOpen(false)}>{label}</Link>)}
        </Container>
      </nav>
    </header>
  );
}
