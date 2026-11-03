import Image from 'next/image';
import { ArrowDownRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { HeroSurface } from './HeroSurface';

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <HeroSurface>
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-copy"><h1 id="hero-title">Kyle Andrew<br />Masilang</h1></div>
      <div className="portrait-wrap"><div className="portrait"><Image src="/images/kyle-portrait.png" alt="Portrait of Kyle Andrew Masilang" fill priority sizes="(max-width: 390px) 170px, (max-width: 700px) 185px, (max-width: 1000px) 220px, 260px" /></div></div>
    </HeroSurface>
    <div className="hero-bottom"><span>{profile.location}</span><a href="#about">A little more about me <ArrowDownRight size={16} aria-hidden="true" /></a></div>
  </section>;
}
