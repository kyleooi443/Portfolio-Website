import { Code2, Palette, PenLine, Sparkles } from 'lucide-react';

// Settings-style rows; each tile uses an iOS system color.
const interests = [
  { icon: Code2, color: '#007AFF', title: 'Software development', detail: 'Building and exploring ideas through code.' },
  { icon: Palette, color: '#FF9500', title: 'Graphic design', detail: 'Thinking about how things look, feel, and communicate.' },
  { icon: PenLine, color: '#FF2D55', title: 'Student journalism', detail: 'An interest in stories, clarity, and asking better questions.' },
  { icon: Sparkles, color: '#AF52DE', title: 'Creative experiments', detail: 'Trying small ideas across design and technology.' },
];

export function Experience() {
  return <section className="section-block" aria-labelledby="experience-title">
    <div className="section-heading"><h2 id="experience-title">Things I&apos;ve been up to.</h2></div>
    <ul className="settings-list">{interests.map(({ icon: Icon, color, title, detail }) => <li className="settings-row" key={title}>
      <span className="row-icon" style={{ background: color }}><Icon size={18} strokeWidth={2} aria-hidden="true" /></span>
      <span className="settings-row-text"><strong>{title}</strong><span>{detail}</span></span>
    </li>)}</ul>
  </section>;
}
