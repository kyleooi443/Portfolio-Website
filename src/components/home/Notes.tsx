import { getAllNotes } from '@/lib/content';
import { NoteCard } from '@/components/ui/NoteCard';

export function Notes() {
  const notes = getAllNotes();
  return <section id="notes" className="section-block section-offset" aria-labelledby="notes-title"><div className="section-heading"><h2 id="notes-title">Sometimes I write.</h2><p>Little things I&apos;ve learned, made, or thought about along the way.</p></div><div className="notes-grid">{notes.length ? notes.map((note) => <NoteCard note={note} key={note.slug} />) : <p>Notes will find a home here soon.</p>}</div></section>;
}
