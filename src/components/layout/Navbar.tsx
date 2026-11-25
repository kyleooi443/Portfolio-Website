'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, MessageCircle, NotebookPen, UserRound } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { ThemeControl } from './ThemeControl';

const links = [
  { label: 'About', hash: 'about', icon: UserRound },
  { label: 'Projects', hash: 'projects', icon: LayoutGrid },
  { label: 'Notes', hash: 'notes', icon: NotebookPen },
  { label: 'Contact', hash: 'contact', icon: MessageCircle },
];

// Which section to highlight: the one in view on the home page, or the route's section elsewhere.
function useActiveSection() {
  const pathname = usePathname();
  const [visibleSection, setVisibleSection] = useState<string>();
  const routeSection = pathname.split('/')[1];

  useEffect(() => {
    if (pathname !== '/') return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setVisibleSection(entry.target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });
    for (const { hash } of links) {
      const section = document.getElementById(hash);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [pathname]);

  const active = pathname === '/' ? visibleSection : routeSection;
  const index = links.findIndex(({ hash }) => hash === active);
  // Drives the sliding selection capsule in CSS.
  const indicator = { '--i': Math.max(index, 0), '--on': index < 0 ? 0 : 1 } as CSSProperties;
  return { pathname, active, indicator };
}

export function Navbar() {
  const { pathname, active, indicator } = useActiveSection();
  // Project and note pages render their own iOS-style nav bar (PageBar) instead of the pill.
  if (/^\/(projects|notes)\/./.test(pathname)) return null;

  return <header className="site-header">
      <nav className="nav-pill glass" aria-label="Primary navigation">
        <div className="nav-links" style={indicator}>
          {links.map(({ label, hash }) => <Link key={hash} href={`/#${hash}`} data-active={active === hash || undefined}>{label}</Link>)}
        </div>
      </nav>
      <div className="theme-pill glass"><ThemeControl name="appearance-nav" compact /></div>
    </header>;
}

// Rendered after the footer so keyboard order follows the page; CSS pins it to the bottom on phones.
export function TabBar() {
  const { active, indicator } = useActiveSection();
  const [compact, setCompact] = useState(false);

  // iOS 26 behavior: the tab bar shrinks while scrolling down and returns on any scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 8) return;
      setCompact(y > lastY && y > 240);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <nav className="tab-bar glass" data-compact={compact || undefined} style={indicator} aria-label="Sections">
    {links.map(({ label, hash, icon: Icon }) => <Link key={hash} href={`/#${hash}`} data-active={active === hash || undefined}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /><span>{label}</span></Link>)}
  </nav>;
}
