import { Link } from "react-router-dom";
import Button from "../ui/Button";
import ProjectsCarousel from "../ui/ProjectsCarousel";
import Reveal from "../ui/Reveal";
import { projects, CV_PATH } from "../../lib/projects";

function ProjectsPage() {
  const hasPublished = projects.some(
    (project) =>
      project.status !== "coming-soon" &&
      (project.github?.trim() || project.demo?.trim()),
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
          <h1
            id="projects-heading"
            className="section-heading mt-3 max-w-[16ch]"
          >
            Proof of work
          </h1>
        </div>
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
        <Reveal delay={80} className="projects-carousel-wrap">
          <ProjectsCarousel projects={projects} />
        </Reveal>
      )}

      <Reveal as="footer" className="projects-footnote" delay={200}>
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
