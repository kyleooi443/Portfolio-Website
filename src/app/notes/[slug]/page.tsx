import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
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
  return <Container className="article-page"><div className="reading-column"><Link className="back-link" href="/#notes"><ArrowLeft size={17} aria-hidden="true" /> Back to notes</Link><header className="article-header"><p className="meta-line">{note.isSample ? 'Sample article · Not published' : note.date ? new Date(note.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Undated'} <span aria-hidden="true">/</span> {note.topic}</p><h1>{note.title}</h1><p className="detail-lede">{note.excerpt}</p></header><MdxContent source={note.body} />{next && <Link className="next-story" href={`/notes/${next.slug}`}><span className="meta-line">Next note</span><span>{next.title} <ArrowUpRight size={21} aria-hidden="true" /></span></Link>}</div></Container>;
}
