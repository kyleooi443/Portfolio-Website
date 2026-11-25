import Link from 'next/link';
import { Compass } from 'lucide-react';
import { Container } from '@/components/layout/Container';

// iOS "content unavailable" layout: icon, title, description, one action.
export default function NotFound() {
  return <Container className="not-found">
    <span className="not-found-icon"><Compass size={34} strokeWidth={1.6} aria-hidden="true" /></span>
    <h1>This page wandered off.</h1>
    <p>It may have moved, or the address might need another look.</p>
    <Link className="capsule-button" href="/">Back to the little corner</Link>
    <p className="section-label">Error 404</p>
  </Container>;
}
