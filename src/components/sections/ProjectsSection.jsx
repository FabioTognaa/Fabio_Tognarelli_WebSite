import { Link } from "react-router-dom";
import ProjectCard from "../ui/ProjectCard";
import Reveal from "../ui/Reveal";
import { projects } from "../../lib/projects";

function ProjectsSection() {
  const teaser = projects.slice(0, 3);

  return (
    <section
      id="progetti"
      className="section-pad border-t border-line bg-hero/5 scroll-mt-header"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Progetti</p>
            <h2 id="projects-heading" className="section-heading mt-3">
              Proof of work
            </h2>
          </div>
          <Link to="/projects" className="link-arrow shrink-0">
            Tutti i progetti
            <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <p className="prose-body mt-6">
            Griglia pronta per i prossimi case study: ogni card avrà screenshot,
            stack e link al repository. Nel frattempo vedi come sarà organizzato
            il proof of work.
          </p>
        </Reveal>

        <div
          className="mt-10 grid auto-rows-fr gap-4 sm:gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Anteprima progetti"
        >
          {teaser[0] && (
            <Reveal className="md:col-span-2 lg:row-span-2">
              <ProjectCard project={teaser[0]} size="featured" />
            </Reveal>
          )}
          {teaser.slice(1).map((project, index) => (
            <Reveal key={project.id} delay={120 + index * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
