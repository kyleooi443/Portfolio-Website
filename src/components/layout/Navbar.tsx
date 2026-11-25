'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Container } from './Container';

const links = [
  { label: 'About', hash: 'about' },
  { label: 'Projects', hash: 'projects' },
  { label: 'Notes', hash: 'notes' },
  { label: 'Contact', hash: 'contact' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Container className="nav-inner flex items-center justify-between">
        <Link className="wordmark" href="/" aria-label="Kyle, home">kyle<span>.</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(({ label, hash }) => <Link key={hash} href={`/#${hash}`} aria-current={pathname.startsWith(`/${hash}`) ? 'page' : undefined}>{label}</Link>)}
        </nav>
        {/* Radix Dialog handles focus trapping, Escape-to-close, and returning focus to the trigger. */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="menu-toggle size-11" variant="outline" size="icon" aria-label="Open menu"><Menu className="size-5" aria-hidden="true" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(85vw,320px)]">
            <SheetHeader className="px-6 pt-6">
              <SheetTitle className="wordmark">kyle<span>.</span></SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
            </SheetHeader>
            <nav className="mobile-nav-links" aria-label="Mobile navigation">
              {links.map(({ label, hash }) => <SheetClose asChild key={hash}><Link href={`/#${hash}`}>{label}</Link></SheetClose>)}
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
