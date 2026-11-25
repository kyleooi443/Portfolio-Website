import type { Metadata, Viewport } from 'next';
import { Navbar, TabBar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { themeScript } from '@/components/layout/ThemeControl';
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

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F2F2F7' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning: the theme script may set data-theme on <html> before React hydrates.
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body id="top"><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main">{children}</main><Footer /><TabBar /></body></html>;
}
