import Image from 'next/image';
import { Camera } from 'lucide-react';

type Moment = { title: string; caption: string; hue: 'blue' | 'purple' | 'rose'; art: string[]; image?: string; alt?: string };

// Until real photos exist, each album shows a themed ASCII scene and says so. Add `image` and `alt` to show a photo instead.
const moments: Moment[] = [
  { title: 'Around Batangas', caption: 'Home views worth pulling over for, from the coast to the hills.', hue: 'blue', art: [
    '                  .---.',
    '       /\\        (     )',
    '      /  \\  /\\    \'---\'',
    '     /    \\/  \\        ~   ~',
    '    /      \\   \\    __/\\__',
    ' ~~~~~~~~~~~~~~~~~~~\\____/~~~~~~',
    '   ~~    ~~~~    ~~      ~~~   ~',
    '      ~~~     ~~    ~~~~     ~~',
  ] },
  { title: 'In the margins', caption: 'Notebook pages, doodles, and the in-between moments of student life.', hue: 'purple', art: [
    '  o o o o o o o o o o',
    ' .-------------------.',
    ' | ~~~~~~~~~~~~~     |',
    ' | ~~~~~~~~~~        |',
    ' | ~~~~~~~~~~~~~~~   |',
    ' | ~~~~~      *      |',
    " '-------------------'",
  ] },
  { title: 'Making things', caption: 'Proof that not every idea starts in a code editor.', hue: 'rose', art: [
    '     *        .     *',
    '   .---------------.',
    '   |   /\\     ()   |',
    '   |  /  \\   [__]  |',
    "   '---------------'",
    '        /       \\',
    '       /         \\',
  ] },
];

// Pad every line to the widest one so the scene stays aligned when centered.
const block = (art: string[]) => {
  const width = Math.max(...art.map((line) => line.length));
  return art.map((line) => line.padEnd(width)).join('\n');
};

export function OutsideScreen() {
  return <section className="section-block" aria-labelledby="outside-title">
    <div className="section-heading"><h2 id="outside-title">Outside the screen.</h2><p>Life beyond the laptop. These albums are saving a spot for real photos, so for now they&apos;re sketched in ASCII.</p></div>
    {/* Photos "Memories" layout: one featured album, two stacked beside it; a swipeable shelf on phones. */}
    <div className="album-grid">{moments.map((moment) => <figure className={`album album-${moment.hue}`} key={moment.title}>
      {moment.image
        ? <div className="album-cover"><Image src={moment.image} alt={moment.alt ?? ''} fill sizes="(max-width: 700px) 80vw, 640px" /></div>
        : <div className="album-cover album-placeholder" role="img" aria-label={`Placeholder for ${moment.title.toLowerCase()} photos`}>
          <pre aria-hidden="true">{block(moment.art)}</pre>
          <span className="album-badge" aria-hidden="true"><Camera size={14} aria-hidden="true" />Photos coming soon</span>
        </div>}
      <figcaption><strong>{moment.title}</strong><span>{moment.caption}</span></figcaption>
    </figure>)}</div>
  </section>;
}
