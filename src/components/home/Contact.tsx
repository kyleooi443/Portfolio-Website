import { ArrowUpRight, Github, Globe2, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getVerifiedSocials } from '@/data/profile';

export function Contact() {
  const socials = getVerifiedSocials();
  return <section id="contact" className="contact-panel section-offset reveal" aria-labelledby="contact-title">
    <div><p className="eyebrow">Contact</p><h2 id="contact-title">Say hello!</h2><p>Have something interesting in mind? Feel free to reach out. I&apos;m always up for a good conversation.</p></div>
    <div className="contact-links">{socials.length ? socials.map((social) => {
      const isMail = social.href.startsWith('mailto:');
      const Icon = isMail ? Mail : social.label.toLowerCase().includes('github') ? Github : social.label.toLowerCase().includes('linkedin') ? Linkedin : Globe2;
      return <Button key={social.href} variant="outline" asChild><a href={social.href} target={isMail ? undefined : '_blank'} rel={isMail ? undefined : 'noopener noreferrer'}><Icon aria-hidden="true" />{social.label}<ArrowUpRight aria-hidden="true" /></a></Button>;
    }) : <div className="contact-empty"><span className="contact-empty-icon"><Mail size={18} aria-hidden="true" /></span><p><strong>Links coming soon</strong>Contact links will appear here once they&apos;re added and verified.</p></div>}</div>
  </section>;
}
