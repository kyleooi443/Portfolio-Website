import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { PageBar } from '@/components/layout/PageBar';
import { MdxContent } from '@/components/ui/MdxContent';
import { getAllNotes, getNote } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return getAllNotes().map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: 'Note not found' };
  return { title: note.title, description: note.excerpt, alternates: { canonical: `/notes/${slug}` }, openGraph: { title: note.title, description: note.excerpt, type: 'article', ...(note.date ? { publishedTime: note.date } : {}), images: [{ url: '/opengraph-image', width: 1200, height: 630 }] } };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const notes = getAllNotes();
  const currentIndex = notes.findIndex((item) => item.slug === slug);
  const next = notes.length > 1 ? notes[(currentIndex + 1) % notes.length] : undefined;
  const date = note.date ? new Date(note.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Undated';
  return <>
    <PageBar backHref="/#notes" backLabel="Notes" title={note.title} />
    <Container className="detail-page">
      <div className="reading-column">
        <header className="article-header large-title"><h1>{note.title}</h1><p className="detail-lede">{note.excerpt}</p></header>
        <dl className="info-list">
          <div><dt>Topic</dt><dd>{note.topic}</dd></div>
          {note.isSample && <div><dt>Status</dt><dd>Sample article</dd></div>}
          <div><dt>Published</dt><dd>{note.isSample ? 'Not yet' : date}</dd></div>
        </dl>
        <MdxContent source={note.body} />
      </div>
      {next && <Link className="next-story" href={`/notes/${next.slug}`}><span><span className="section-label">Next note</span>{next.title}</span><ChevronRight size={22} aria-hidden="true" /></Link>}
    </Container>
  </>;
}
