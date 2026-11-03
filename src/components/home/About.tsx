import { ArrowUpRight } from 'lucide-react';
import { getVerifiedSocials, profile } from '@/data/profile';

export function About() {
  const socials = getVerifiedSocials();
  return <section id="about" className="about-panel section-offset" aria-labelledby="about-title">
    <div className="about-main"><h2 id="about-title">Hey there!</h2><p className="about-intro">{profile.introduction}</p><p className="about-small">I&apos;m curious about software development, graphic design, student journalism, and all the little experiments in between.</p></div>
    <div className="about-side"><div className="timeline" aria-label="Education timeline">{profile.timeline.map((item) => {
      const [firstLine, secondLine] = item.detail.split('\n');
      const isCurrent = 'current' in item && item.current;
      return <div className={`timeline-item${isCurrent ? ' timeline-item-current' : ''}`} key={item.label}>
        <span className="timeline-dot" aria-hidden="true" />
        <span className="meta-line">{item.label}</span>
        <p>{isCurrent ? <strong>{firstLine}</strong> : firstLine}<br />{secondLine}</p>
      </div>;
    })}</div>
      {socials.length > 0 && <div className="inline-links">{socials.map((social) => <a key={social.href} href={social.href} target={social.href.startsWith('mailto:') ? undefined : '_blank'} rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}>{social.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>}
    </div>
  </section>;
}
