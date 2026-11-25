import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MdxContent } from '@/components/ui/MdxContent';
import { getNextProject, getProject, projects } from '@/data/projects';
import { getProjectStory } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };
  return { title: project.title, description: project.description, alternates: { canonical: `/projects/${slug}` }, openGraph: { title: project.title, description: project.description, type: 'article', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  const story = getProjectStory(slug);
  if (!project || !story) notFound();
  const next = getNextProject(slug);
  return <Container className="detail-page">
    <Link className="back-link" href="/#projects"><ArrowLeft size={17} aria-hidden="true" /> Back to projects</Link>
    <header className="detail-header" style={{ '--project-accent': project.accent } as CSSProperties}>
      <div className="detail-meta"><Badge variant="outline">{project.status}</Badge><span>{project.category}</span>{project.year && <span>{project.year}</span>}</div>
      <h1>{project.title}</h1>
      <p className="detail-lede">{project.description}</p>
      {project.links?.length ? <div className="project-links">{project.links.map((link) => <Button key={link.href} variant="outline" size="lg" asChild><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight aria-hidden="true" /></a></Button>)}</div> : null}
    </header>
    <div className="reading-column"><MdxContent source={story} /></div>
    {next && <Link className="next-story" href={`/projects/${next.slug}`}><span><span className="meta-line">Next project</span>{next.title}</span><ArrowUpRight size={22} aria-hidden="true" /></Link>}
  </Container>;
}
