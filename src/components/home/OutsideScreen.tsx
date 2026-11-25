import Image from 'next/image';

const moments = [
  { title: 'Around Batangas', caption: 'A space for the places and views I want to remember.', image: '/images/outside-batangas.svg' },
  { title: 'In the margins', caption: 'Student life, notes, and works in progress.', image: '/images/outside-notes.svg' },
  { title: 'Making things', caption: 'The creative experiments that happen away from a code editor.', image: '/images/outside-making.svg' },
];

export function OutsideScreen() {
  return <section className="section-block outside reveal" aria-labelledby="outside-title"><div className="section-heading"><p className="eyebrow">Offline</p><h2 id="outside-title">Outside the screen.</h2><p>Photos from my own days will live here. These are illustrated placeholders for now.</p></div><div className="outside-grid">{moments.map((moment) => <figure key={moment.title}><div className="outside-image"><Image src={moment.image} alt={`Illustrated placeholder for ${moment.title.toLowerCase()} photo`} fill sizes="(max-width: 720px) 100vw, 390px" /></div><figcaption><strong>{moment.title}</strong><span>{moment.caption}</span></figcaption></figure>)}</div></section>;
}
