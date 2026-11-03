export interface SocialLink {
  label: string;
  href: string;
  verified: boolean;
}

export const profile = {
  name: 'Kyle Andrew Masilang',
  shortName: 'Kyle',
  tagline: 'CS student. I design things, write code, and build stuff for fun.',
  location: 'Batangas, Philippines',
  introduction:
    'I’m Kyle, a Computer Science student at Batangas State University. I like building software, thinking through design, and finding little intersections between technology, journalism, and creative work. This is where I keep the ideas and projects I’m exploring.',
  timeline: [
    { label: 'Now', detail: 'BS Computer Science\nBatangas State University', current: true },
    { label: 'Previously', detail: 'STEM — Senior High School\nOur Lady of Mercy Academy' },
  ],
  // Add only confirmed URLs. An empty list keeps unverified profiles off the site.
  socials: [] as SocialLink[],
};

export function getVerifiedSocials(links: SocialLink[] = profile.socials): SocialLink[] {
  return links.filter(({ href, verified }) => {
    if (!verified) return false;
    if (/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(href)) return true;
    try {
      const url = new URL(href);
      return url.protocol === 'https:' && Boolean(url.hostname);
    } catch {
      return false;
    }
  });
}
