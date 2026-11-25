import { ViewTransition, type CSSProperties } from 'react';
import Link from 'next/link';
import { ChevronRight, ListChecks, Mic, Recycle, Sun, Waves, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/data/projects';

// Glyphs chosen from each project's subject; new projects fall back to a monogram.
const glyphs: Record<string, LucideIcon> = { nextwise: ListChecks, reclaim: Recycle, 'project-liwanag': Sun, agos: Waves, castai: Mic };

const accentStyle = (project: Project) => ({ '--project-accent': project.accent }) as CSSProperties;

export function AppIcon({ project, size = 'md' }: { project: Project; size?: 'md' | 'lg' }) {
  const Glyph = glyphs[project.slug];
  return <ViewTransition name={`app-icon-${project.slug}`} share="morph" default="none">
    <span className={`app-icon${size === 'lg' ? ' app-icon-lg' : ''}`} style={accentStyle(project)} aria-hidden="true">{Glyph ? <Glyph /> : project.title[0]}</span>
  </ViewTransition>;
}

export function FeaturedProject({ project }: { project: Project }) {
  return <Link className="today-card" href={`/projects/${project.slug}`} style={accentStyle(project)} aria-label={`Read about ${project.title}, ${project.status}`}>
    <span className="today-kicker">Featured</span>
    <h3 className="today-title">{project.title}</h3>
    <p className="today-desc">{project.description}</p>
    <span className="today-app">
      <AppIcon project={project} />
      <span className="today-app-text"><strong>{project.title}</strong><span>{project.category}{project.year && `, ${project.year}`}</span></span>
      <Badge variant="outline">{project.status}</Badge>
      <span className="read-pill">Read</span>
    </span>
  </Link>;
}

export function ProjectRow({ project }: { project: Project }) {
  return <Link className="app-row" href={`/projects/${project.slug}`} style={accentStyle(project)} aria-label={`Read about ${project.title}, ${project.status}`}>
    <AppIcon project={project} />
    <span className="app-row-text">
      <strong>{project.title}</strong>
      <span className="app-row-desc">{project.description}</span>
      <span className="app-row-meta"><Badge variant="outline">{project.status}</Badge><span>{project.category}{project.year && `, ${project.year}`}</span></span>
    </span>
    <span className="read-pill">Read</span>
    <ChevronRight className="app-row-chevron" size={20} aria-hidden="true" />
  </Link>;
}
