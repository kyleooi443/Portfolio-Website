import { ArrowUpRight, Github, Globe2, Linkedin, Mail } from 'lucide-react';
import { getVerifiedSocials } from '@/data/profile';

export function Contact() {
  const socials = getVerifiedSocials();
  return <section id="contact" className="contact-panel section-offset" aria-labelledby="contact-title"><div><h2 id="contact-title">Say hello!</h2><p>Have something interesting in mind? Feel free to reach out. I&apos;m always up for a good conversation.</p></div><div className="contact-links">{socials.length ? socials.map((social) => {
    const Icon = social.href.startsWith('mailto:') ? Mail : social.label.toLowerCase().includes('github') ? Github : social.label.toLowerCase().includes('linkedin') ? Linkedin : Globe2;
    return <a key={social.href} href={social.href} target={social.href.startsWith('mailto:') ? undefined : '_blank'} rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}><Icon size={17} aria-hidden="true" />{social.label}<ArrowUpRight size={15} aria-hidden="true" /></a>;
  }) : <p>Contact links will appear here once they&apos;re added and verified.</p>}</div></section>;
}
