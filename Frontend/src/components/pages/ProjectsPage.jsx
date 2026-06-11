import { Link } from "react-router-dom";
import ProjectCard from "../ui/ProjectCard";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { projects, CV_PATH } from "../../lib/projects";

const PROJECT_LAYOUT = [
  "projects-layout__item md:col-span-2 lg:col-span-7 lg:row-span-2",
  "projects-layout__item lg:col-span-5",
  "projects-layout__item lg:col-span-5",
];

function ProjectsPage() {
  const hasPublished = projects.some(
    (p) => p.link && p.status !== "coming-soon",
  );

  return (
    <section
      id="progetti"
      className="section-pad scroll-mt-header mx-auto max-w-7xl xl:max-w-[88rem]"
      aria-labelledby="projects-heading"
    >
      <Reveal className="projects-intro">
        <div className="projects-intro__head">
          <p className="section-label">Progetti</p>
          <h1 id="projects-heading" className="section-heading mt-3 max-w-[14ch]">
            Tutti i lavori
          </h1>
        </div>
        <p className="skills-hint projects-intro__copy">
          {hasPublished
            ? "Selezione di lavori personali e universitari, con codice, demo e note sulle scelte tecniche."
            : "Sto preparando i case study completi. Qui trovi già tre slot con lo spazio riservato a demo, stack e repository."}
        </p>
      </Reveal>

      {projects.length === 0 ? (
        <Reveal delay={80}>
          <div className="projects-empty surface-panel">
            <p className="text-ink-muted text-lg">
              Nessun progetto pubblicato al momento.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={CV_PATH} download={CV_PATH}>
                Scarica CV
              </Button>
              <Button variant="ghost" to="/contact">
                Contattami
              </Button>
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="projects-layout" aria-label="Elenco progetti">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={100 + index * 80}
              className={PROJECT_LAYOUT[index] ?? "projects-layout__item"}
            >
              <ProjectCard
                project={project}
                size={index === 0 ? "featured" : "default"}
              />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal as="footer" className="projects-footnote" delay={320}>
        <p className="text-ink-muted text-sm leading-relaxed md:text-base">
          Altri progetti in arrivo.{" "}
          <Link
            to="/contact"
            className="motion-link text-accent hover:text-accent-deep font-semibold"
          >
            Scrivimi
          </Link>{" "}
          se vuoi collaborare.
        </p>
      </Reveal>
    </section>
  );
}

export default ProjectsPage;
