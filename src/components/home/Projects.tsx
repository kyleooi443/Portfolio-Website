import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';

export function Projects() {
  return <section id="projects" className="section-block section-offset" aria-labelledby="projects-title"><div className="section-heading"><h2 id="projects-title">Things I&apos;ve made.</h2><p>A collection of projects, experiments, and ideas I&apos;ve spent way too much time thinking about.</p></div><div className="project-grid">{projects.length ? projects.map((project) => <ProjectCard project={project} key={project.slug} />) : <p>Project stories are being gathered. Check back soon.</p>}</div></section>;
}
