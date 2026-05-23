import { Link } from "react-router-dom";
import PageShell from "../layout/PageShell";
import ProjectCard from "../ui/ProjectCard";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { projects, CV_PATH } from "../../lib/projects";

function ProjectsPage() {
  const hasPublished = projects.some(
    (p) => p.link && p.status !== "coming-soon",
  );

  return (
    <PageShell>
      <div className="section-pad mx-auto max-w-6xl">
        <Reveal>
          <p className="section-label">Progetti</p>
          <h1 className="section-heading mt-3">Tutti i lavori</h1>
        </Reveal>

        {!hasPublished && (
          <Reveal delay={80}>
            <p className="prose-body mt-6">
              Sto preparando i case study completi. Qui trovi già la griglia con
              tre slot: apri una card per vedere lo spazio riservato a demo,
              stack e codice.
            </p>
          </Reveal>
        )}

        {projects.length === 0 ? (
          <div className="surface-panel mt-12 p-10 text-center">
            <p className="text-lg text-ink-muted">
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
        ) : (
          <div
            className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
            aria-label="Elenco progetti"
          >
            {projects.map((project, index) => (
              <Reveal
                key={project.id}
                delay={100 + index * 80}
                className={index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
              >
                <ProjectCard
                  project={project}
                  size={index === 0 ? "featured" : "default"}
                />
              </Reveal>
            ))}
          </div>
        )}

        <p className="mt-12 text-ink-muted">
          Altri progetti in arrivo.{" "}
          <Link to="/contact" className="motion-link font-semibold text-accent hover:text-accent-deep">
            Scrivimi
          </Link>{" "}
          se vuoi collaborare.
        </p>
      </div>
    </PageShell>
  );
}

export default ProjectsPage;
