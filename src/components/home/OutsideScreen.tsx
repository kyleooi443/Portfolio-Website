import Image from 'next/image';

const moments = [
  { title: 'Around Batangas', caption: 'A space for the places and views I want to remember.', image: '/images/outside-batangas.svg' },
  { title: 'In the margins', caption: 'Student life, notes, and works in progress.', image: '/images/outside-notes.svg' },
  { title: 'Making things', caption: 'The creative experiments that happen away from a code editor.', image: '/images/outside-making.svg' },
];

export function OutsideScreen() {
  return <section className="section-block" aria-labelledby="outside-title"><div className="section-heading"><h2 id="outside-title">Outside the screen.</h2><p>Photos from my own days will live here. These are illustrated placeholders for now.</p></div><div className="album-grid">{moments.map((moment) => <figure className="album" key={moment.title}><div className="album-cover"><Image src={moment.image} alt={`Illustrated placeholder for ${moment.title.toLowerCase()} photo`} fill sizes="(max-width: 700px) 100vw, 370px" /></div><figcaption><strong>{moment.title}</strong><span>{moment.caption}</span></figcaption></figure>)}</div></section>;
}
