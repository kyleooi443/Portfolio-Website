import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return <Container className="not-found"><p className="section-label">404 · A page out of place</p><h1>This page wandered off.</h1><p>It may have moved, or the address might need another look.</p><Link className="text-link" href="/"><ArrowLeft size={17} aria-hidden="true" /> Back to the little corner</Link></Container>;
}
