import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Project } from '@/data/projects';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <Link className={`project-card${project.featured ? ' project-card-featured' : ''}`} href={`/projects/${project.slug}`} style={{ '--project-accent': project.accent } as CSSProperties} aria-label={`Read about ${project.title}, ${project.status}`}>
    <Card className="project-surface">
      <div className="project-card-top">
        <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
        <div className="project-badges">{project.featured && <Badge>Featured</Badge>}<Badge variant="outline">{project.status}</Badge></div>
      </div>
      <div>
        <p className="project-category">{project.category}{project.year && <> · {project.year}</>}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
      <span className="project-cta">Read the story <ArrowUpRight size={18} aria-hidden="true" /></span>
    </Card>
  </Link>;
}
