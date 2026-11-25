import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { profile } from '@/data/profile';
import { HeroSurface } from './HeroSurface';

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <HeroSurface>
      <div className="hero-wallpaper" aria-hidden="true" />
      <div className="hero-copy"><h1 id="hero-title">Kyle Andrew<br />Masilang</h1><p className="hero-tagline">{profile.tagline}</p></div>
      <div className="portrait-wrap"><div className="portrait"><Image src="/images/kyle-portrait.png" alt="Portrait of Kyle Andrew Masilang" fill priority sizes="(max-width: 420px) 148px, (max-width: 700px) 168px, (max-width: 1000px) 220px, 264px" /></div></div>
    </HeroSurface>
    <div className="hero-bottom"><a className="capsule-button capsule-filled" href="#projects">View projects</a><a className="capsule-button capsule-gray" href="#contact">Contact</a><span className="hero-location"><MapPin size={16} aria-hidden="true" />{profile.location}</span></div>
  </section>;
}
