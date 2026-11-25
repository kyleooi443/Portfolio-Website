import { ArrowUpRight, Globe, GraduationCap, History } from 'lucide-react';
import { getVerifiedSocials, profile } from '@/data/profile';
import { WorldClock } from './LocalTime';

export function About() {
  const socials = getVerifiedSocials();
  const [city, country] = profile.location.split(', ');
  return <section id="about" className="about section-offset" aria-labelledby="about-title">
    <div className="about-intro-col">
      <h2 id="about-title" className="toon-title">Hey there!</h2>
      <p className="about-intro">{profile.introduction}</p>
      <p className="about-small">I&apos;m curious about software development, graphic design, student journalism, and all the little experiments in between.</p>
      {socials.length > 0 && <div className="inline-links">{socials.map((social) => <a key={social.href} href={social.href} target={social.href.startsWith('mailto:') ? undefined : '_blank'} rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}>{social.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>}
    </div>
    <div className="widget-grid">
      {profile.timeline.map((item) => {
        const [firstLine, secondLine] = item.detail.split('\n');
        const isCurrent = 'current' in item && item.current;
        const Icon = isCurrent ? GraduationCap : History;
        return <div className={`widget${isCurrent ? ' widget-current' : ''}`} key={item.label}>
          <p className="widget-label"><Icon size={15} aria-hidden="true" />{item.label}</p>
          <p className="widget-title">{firstLine}</p>
          <p className="widget-sub">{secondLine}</p>
        </div>;
      })}
      <div className="widget widget-clock">
        <WorldClock city={city} />
        <p className="widget-label clock-label"><Globe size={15} aria-hidden="true" />{country}</p>
      </div>
    </div>
  </section>;
}
