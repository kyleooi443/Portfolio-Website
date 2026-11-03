import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from './Container';

export function Footer() {
  return <footer className="footer"><Container className="footer-inner"><span>© {new Date().getFullYear()} Kyle Andrew Masilang</span><span>Made with care in Batangas.</span><Link href="#top">Back to top <ArrowUpRight size={15} aria-hidden="true" /></Link></Container></footer>;
}
