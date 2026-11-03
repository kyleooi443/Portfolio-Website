import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { NoteMeta } from '@/lib/content';

export function NoteCard({ note }: { note: NoteMeta }) {
  return <Link className={`note-card note-card-${note.surface}`} href={`/notes/${note.slug}`}>
    <div className="note-top"><span className="meta-line">{note.isSample ? 'Sample article' : note.date ? new Date(note.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Undated'}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
    <div><span className="note-topic">{note.topic}</span><h3>{note.title}</h3><p>{note.excerpt}</p></div>
  </Link>;
}
