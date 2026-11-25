import Link from 'next/link';
import { ChevronRight, NotebookPen } from 'lucide-react';
import type { NoteMeta } from '@/lib/content';

// A row in a Notes-app style list: title, then the date (or sample status) leading into the preview text.
export function NoteRow({ note }: { note: NoteMeta }) {
  const when = note.isSample ? 'Sample' : note.date ? new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Undated';
  return <Link className={`grouped-row note-row note-row-${note.surface}`} href={`/notes/${note.slug}`}>
    <span className="row-icon"><NotebookPen size={18} aria-hidden="true" /></span>
    <span className="note-row-text"><strong>{note.title}</strong><span><b>{when}</b>{note.excerpt}</span></span>
    <ChevronRight className="row-chevron" size={18} aria-hidden="true" />
  </Link>;
}
