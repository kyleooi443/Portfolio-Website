import assert from 'node:assert/strict';
import test from 'node:test';
import { projects, getProject, getNextProject } from '../src/data/projects';
import { getAllNotes, getNote, getProjectStory } from '../src/lib/content';
import { getVerifiedSocials } from '../src/data/profile';

test('every project card resolves to a unique case study', () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    assert.equal(getProject(project.slug)?.title, project.title);
    assert.ok(project.status);
    assert.ok(getProjectStory(project.slug)?.includes('##'), `${project.slug} needs an MDX story`);
  }
});

test('next project wraps to the first project', () => {
  assert.equal(getNextProject(projects.at(-1)!.slug)?.slug, projects[0].slug);
});

test('notes have unique slugs and readable MDX content', () => {
  const notes = getAllNotes();
  assert.ok(notes.length > 0);
  assert.equal(new Set(notes.map((note) => note.slug)).size, notes.length);
  for (const note of notes) {
    assert.ok(note.isSample);
    assert.ok(getNote(note.slug)?.body.includes('#'));
  }
});

test('public social links include only verified mail or HTTPS destinations', () => {
  const links = getVerifiedSocials([
    { label: 'Email', href: 'mailto:kyle@example.com', verified: true },
    { label: 'GitHub', href: 'https://github.com/example', verified: true },
    { label: 'Unconfirmed', href: 'https://example.com', verified: false },
    { label: 'Unsafe', href: 'javascript:alert(1)', verified: true },
  ]);
  assert.deepEqual(links.map(({ label }) => label), ['Email', 'GitHub']);
});
