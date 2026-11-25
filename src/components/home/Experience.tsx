import { Code2, Palette, PenLine, Sparkles } from 'lucide-react';

const interests = [
  { icon: Code2, title: 'Software development', detail: 'Building and exploring ideas through code.' },
  { icon: Palette, title: 'Graphic design', detail: 'Thinking about how things look, feel, and communicate.' },
  { icon: PenLine, title: 'Student journalism', detail: 'An interest in stories, clarity, and asking better questions.' },
  { icon: Sparkles, title: 'Creative experiments', detail: 'Trying small ideas across design and technology.' },
];

export function Experience() {
  return <section className="section-block experience reveal" aria-labelledby="experience-title"><div className="section-heading"><p className="eyebrow">Interests</p><h2 id="experience-title">Things I&apos;ve been up to.</h2></div><div className="interest-list">{interests.map(({ icon: Icon, title, detail }) => <div className="interest-row" key={title}><span className="interest-icon"><Icon size={18} strokeWidth={1.6} aria-hidden="true" /></span><h3>{title}</h3><p>{detail}</p></div>)}</div></section>;
}
