export type ProjectStatus = 'Concept' | 'In progress' | 'Prototype' | 'Completed';

export interface Project {
  slug: string;
  title: string;
  description: string;
  year?: string;
  category: string;
  status: ProjectStatus;
  featured?: boolean;
  accent: string;
  links?: { label: string; href: string }[];
}

// Update years, statuses, imagery, and links when details are verified.
// Add a matching content/projects/<slug>.mdx file for each new project.
export const projects: Project[] = [
  {
    slug: 'nextwise',
    title: 'NEXTWISE',
    description: 'An adaptive productivity companion for choosing the next meaningful action.',
    category: 'Productivity · Software',
    status: 'Concept',
    featured: true,
    accent: '#dce8de',
  },
  {
    slug: 'reclaim',
    title: 'RECLAIM',
    description: 'An AI-assisted marketplace concept for giving unused items another life.',
    category: 'Marketplace · Software',
    status: 'Concept',
    accent: '#eee4d8',
  },
  {
    slug: 'project-liwanag',
    title: 'Project LIWANAG',
    description: 'Exploring energy management and thoughtful demand response.',
    category: 'Energy · Research concept',
    status: 'Concept',
    accent: '#f0ead5',
  },
  {
    slug: 'agos',
    title: 'AGOS',
    description: 'A forecast-driven idea for energy dispatch and resilience.',
    category: 'Energy · Research concept',
    status: 'Concept',
    accent: '#dbe8e8',
  },
  {
    slug: 'castai',
    title: 'CastAI',
    description: 'An experiment in AI-assisted esports commentary and broadcasting.',
    category: 'Broadcast · Creative technology',
    status: 'Concept',
    accent: '#e7e3ea',
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  return index < 0 ? undefined : projects[(index + 1) % projects.length];
}
