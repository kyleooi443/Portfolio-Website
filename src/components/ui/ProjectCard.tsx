import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';

export function ProjectCard({ project }: { project: Project }) {
  return <Link className="project-card" href={`/projects/${project.slug}`} aria-label={`Read about ${project.title}, ${project.status}`}>
    <div className="project-art" style={{ backgroundColor: project.accent }}>
      <Image src={project.cover} alt={project.coverAlt} fill sizes="(max-width: 720px) 100vw, (max-width: 1120px) 50vw, 520px" />
      <span className="art-label">Concept artwork</span>
      {project.featured && <span className="featured-label">Featured</span>}
    </div>
    <div className="project-card-copy">
      <div><div className="project-meta"><span>{project.year ?? 'Year to add'}</span><span>{project.category}</span><span className="status-label">{project.status}</span></div><h3>{project.title}</h3><p className="project-description">{project.description}</p></div>
      <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" />
    </div>
  </Link>;
}
