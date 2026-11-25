import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { PageBar } from '@/components/layout/PageBar';
import { Badge } from '@/components/ui/badge';
import { MdxContent } from '@/components/ui/MdxContent';
import { AppIcon } from '@/components/ui/ProjectCard';
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
  return <>
    <PageBar backHref="/#projects" backLabel="Projects" title={project.title} />
    <Container className="detail-page">
      <div className="reading-column">
        <header className="product-header">
          <AppIcon project={project} size="lg" />
          <div className="large-title"><h1>{project.title}</h1><p className="product-sub">{project.description}</p></div>
        </header>
        {project.links?.length ? <div className="project-links">{project.links.map((link) => <a className="capsule-button" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</div> : null}
        <dl className="info-list">
          <div><dt>Status</dt><dd><Badge variant="outline">{project.status}</Badge></dd></div>
          <div><dt>Category</dt><dd>{project.category}</dd></div>
          {project.year && <div><dt>Year</dt><dd>{project.year}</dd></div>}
        </dl>
        <MdxContent source={story} />
      </div>
      {next && <Link className="next-story" href={`/projects/${next.slug}`}><span><span className="section-label">Next project</span>{next.title}</span><ChevronRight size={22} aria-hidden="true" /></Link>}
    </Container>
  </>;
}
