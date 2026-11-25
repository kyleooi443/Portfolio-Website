import { ChevronRight, Github, Globe2, Linkedin, Mail } from 'lucide-react';
import { getVerifiedSocials } from '@/data/profile';

export function Contact() {
  const socials = getVerifiedSocials();
  return <section id="contact" className="section-block contact section-offset" aria-labelledby="contact-title">
    <div className="section-heading"><h2 id="contact-title">Say hello!</h2><p>Have something interesting in mind? Feel free to reach out. I&apos;m always up for a good conversation.</p></div>
    <div className="grouped-list">{socials.length ? socials.map((social) => {
      const isMail = social.href.startsWith('mailto:');
      const Icon = isMail ? Mail : social.label.toLowerCase().includes('github') ? Github : social.label.toLowerCase().includes('linkedin') ? Linkedin : Globe2;
      return <a className="grouped-row" key={social.href} href={social.href} target={isMail ? undefined : '_blank'} rel={isMail ? undefined : 'noopener noreferrer'}>
        <span className="row-icon"><Icon size={18} aria-hidden="true" /></span><span className="row-label">{social.label}</span><ChevronRight className="row-chevron" size={18} aria-hidden="true" />
      </a>;
    }) : <div className="grouped-row grouped-empty">
      <span className="row-icon"><Mail size={18} aria-hidden="true" /></span>
      <span><strong>Links coming soon</strong><span>Contact links will appear here once they&apos;re added and verified.</span></span>
    </div>}</div>
  </section>;
}
