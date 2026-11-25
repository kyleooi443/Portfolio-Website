import Image from 'next/image';
import { ArrowDownRight, MapPin } from 'lucide-react';
import { profile } from '@/data/profile';
import { HeroSurface } from './HeroSurface';

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <HeroSurface>
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-copy"><h1 id="hero-title">Kyle Andrew<br />Masilang</h1><p className="hero-tagline">{profile.tagline}</p></div>
      <div className="portrait-wrap"><div className="portrait"><Image src="/images/kyle-portrait.png" alt="Portrait of Kyle Andrew Masilang" fill priority sizes="(max-width: 420px) 156px, (max-width: 700px) 176px, (max-width: 1000px) 220px, 264px" /></div></div>
    </HeroSurface>
    <div className="hero-bottom"><span><MapPin size={15} aria-hidden="true" />{profile.location}</span><a href="#about">A little more about me <ArrowDownRight size={16} aria-hidden="true" /></a></div>
  </section>;
}
