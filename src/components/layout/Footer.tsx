import Link from 'next/link';
import { Container } from './Container';
import { ThemeControl } from './ThemeControl';

// A Settings-style Appearance row, then the footnote that sits under an iOS grouped list.
export function Footer() {
  return <footer className="footer"><Container className="footer-inner">
    <div className="grouped-list footer-settings"><div className="grouped-row"><span className="row-label">Appearance</span><ThemeControl name="appearance-footer" /></div></div>
    <span>© {new Date().getFullYear()} Kyle Andrew Masilang</span><span>Made with care in Batangas.</span><Link href="#top">Back to top</Link>
  </Container></footer>;
}
