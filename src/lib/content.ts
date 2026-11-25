import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface NoteMeta {
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  topic: string;
  isSample: boolean;
  surface: 'sage' | 'sand' | 'blue';
  /** Estimated at 200 words per minute from the note body. */
  readingMinutes: number;
}

export interface Note extends NoteMeta {
  body: string;
}

const noteDirectory = path.join(process.cwd(), 'content', 'notes');
const projectDirectory = path.join(process.cwd(), 'content', 'projects');

function readMdx(directory: string, slug: string) {
  const safeSlug = path.basename(slug);
  if (safeSlug !== slug) return undefined;
  const filename = path.join(directory, `${safeSlug}.mdx`);
  if (!fs.existsSync(filename)) return undefined;
  return matter(fs.readFileSync(filename, 'utf8'));
}

// Strips MDX down to readable words (tags, link targets, heading markers, emphasis, code ticks) for word counts.
export function plainText(mdx: string): string {
  return mdx
    .replace(/<[^>]*>/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getAllNotes(): NoteMeta[] {
  if (!fs.existsSync(noteDirectory)) return [];
  return fs.readdirSync(noteDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => getNote(file.slice(0, -4)))
    .filter((note): note is Note => Boolean(note))
    .map(({ slug, title, excerpt, date, topic, isSample, surface, readingMinutes }) => ({ slug, title, excerpt, date, topic, isSample, surface, readingMinutes }))
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
}

export function getNote(slug: string): Note | undefined {
  const parsed = readMdx(noteDirectory, slug);
  if (!parsed) return undefined;
  const data = parsed.data as Partial<NoteMeta>;
  const rawDate = parsed.data.date as unknown;
  if (!data.title || !data.excerpt || !data.topic) return undefined;
  const text = plainText(parsed.content);
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: rawDate instanceof Date ? rawDate.toISOString().slice(0, 10) : rawDate ? String(rawDate) : undefined,
    topic: data.topic,
    isSample: Boolean(data.isSample),
    surface: data.surface ?? 'sage',
    readingMinutes: Math.max(1, Math.round(text.split(' ').length / 200)),
    body: parsed.content,
  };
}

export function getProjectStory(slug: string): string | undefined {
  return readMdx(projectDirectory, slug)?.content;
}
