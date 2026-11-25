import { projects } from '@/data/projects';
import { FeaturedProject, ProjectRow } from '@/components/ui/ProjectCard';

export function Projects() {
  const featured = projects.find((project) => project.featured);
  const others = projects.filter((project) => project !== featured);
  return <section id="projects" className="section-block section-offset" aria-labelledby="projects-title">
    <div className="section-heading"><h2 id="projects-title">Things I&apos;ve made.</h2><p>A collection of projects, experiments, and ideas I&apos;ve spent way too much time thinking about.</p></div>
    {projects.length === 0 && <p>Project stories are being gathered. Check back soon.</p>}
    {featured && <FeaturedProject project={featured} />}
    {others.length > 0 && <div className="app-list">{others.map((project) => <ProjectRow project={project} key={project.slug} />)}</div>}
  </section>;
}
