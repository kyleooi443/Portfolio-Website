import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteUrl } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: 'Kyle Andrew Masilang — Developer & Designer', template: '%s | Kyle Andrew Masilang' },
  description: 'A little corner of the internet where Kyle Andrew Masilang builds, designs, writes, and shares things.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Kyle Andrew Masilang — Developer & Designer',
    description: 'Projects, notes, and creative experiments from Kyle Andrew Masilang in Batangas, Philippines.',
    type: 'website',
    url: '/',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Kyle Andrew Masilang portfolio' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body id="top"><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main">{children}</main><Footer /></body></html>;
}
