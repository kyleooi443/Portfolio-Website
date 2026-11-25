import { MapPin } from 'lucide-react';
import { profile } from '@/data/profile';
import { AsciiTide } from './AsciiTide';
import { HeroSurface } from './HeroSurface';
import { PortraitRobot } from './PortraitRobot';

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <HeroSurface>
      <div className="hero-wallpaper" aria-hidden="true"><AsciiTide /></div>
      <div className="hero-copy"><h1 id="hero-title">Kyle Andrew<br />Masilang</h1><p className="hero-tagline">{profile.tagline}</p></div>
      <PortraitRobot />
    </HeroSurface>
    <div className="hero-bottom"><a className="capsule-button capsule-filled" href="#projects">View projects</a><a className="capsule-button capsule-gray" href="#contact">Contact</a><span className="hero-location"><MapPin size={16} aria-hidden="true" />{profile.location}</span></div>
  </section>;
}
