import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
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
    <header className="detail-header"><p className="meta-line">{project.year ?? 'Year to add'} <span aria-hidden="true">/</span> {project.category} <span aria-hidden="true">/</span> {project.status}</p><h1>{project.title}</h1><p className="detail-lede">{project.description}</p></header>
    <figure className="detail-cover" style={{ backgroundColor: project.accent }}><Image src={project.cover} alt={project.coverAlt} fill priority sizes="(max-width: 1120px) 100vw, 1080px" /><figcaption>Concept artwork. Add actual project screenshots and visuals as they become available.</figcaption></figure>
    <div className="reading-column"><MdxContent source={story} />
      {project.links?.length ? <div className="project-links">{project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</div> : null}
    </div>
    {next && <Link className="next-story" href={`/projects/${next.slug}`}><span className="meta-line">Next project</span><span>{next.title} <ArrowUpRight size={21} aria-hidden="true" /></span></Link>}
  </Container>;
}
