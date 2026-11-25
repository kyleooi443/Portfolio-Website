import Link from 'next/link';
import { ChevronRight, Clock, NotebookPen } from 'lucide-react';
import type { NoteMeta } from '@/lib/content';

// A row in a Notes-app style list: title, the excerpt, then status and reading time, with a Read more action.
export function NoteRow({ note }: { note: NoteMeta }) {
  const when = note.isSample ? 'Sample article' : note.date ? new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Undated';
  return <Link className={`grouped-row note-row note-row-${note.surface}`} href={`/notes/${note.slug}`}>
    <span className="row-icon"><NotebookPen size={18} aria-hidden="true" /></span>
    <span className="note-row-text">
      <span className="note-row-topic">{note.topic}</span>
      <strong>{note.title}</strong>
      <span className="note-row-excerpt">{note.excerpt}</span>
      <span className="note-row-meta"><span>{when}</span><span><Clock size={13} aria-hidden="true" />{note.readingMinutes} min read</span></span>
    </span>
    <span className="read-pill note-read">Read more</span>
    <ChevronRight className="row-chevron note-chevron" size={18} aria-hidden="true" />
  </Link>;
}
