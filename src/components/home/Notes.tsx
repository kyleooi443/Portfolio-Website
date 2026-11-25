import { getAllNotes } from '@/lib/content';
import { NoteRow } from '@/components/ui/NoteCard';

export function Notes() {
  const notes = getAllNotes();
  return <section id="notes" className="section-block section-offset" aria-labelledby="notes-title"><div className="section-heading"><h2 id="notes-title">Sometimes I write.</h2><p>Little things I&apos;ve learned, made, or thought about along the way.</p></div>{notes.length ? <div className="grouped-list note-list">{notes.map((note) => <NoteRow note={note} key={note.slug} />)}</div> : <p>Notes will find a home here soon.</p>}</section>;
}
