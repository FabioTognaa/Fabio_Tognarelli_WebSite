import Reveal from "../ui/Reveal";
import StudyEntry from "../ui/StudyEntry";
import ExperienceEntry from "../ui/ExperienceEntry";
import { studyPath } from "../../lib/study";
import { experiencePath } from "../../lib/experience";

function StudyPage() {
  return (
    <>
      <h1 className="sr-only">Percorso: esperienza e formazione</h1>
      <section
        className="section-pad bg-surface/50 scroll-mt-header"
        aria-labelledby="experience-heading"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="section-label">Percorso</p>
            <h2 id="experience-heading" className="section-heading mt-3">
              Esperienza
            </h2>
            <p className="prose-body mt-6">
              Il mio personale bagaglio di esperienze fin'ora! Nel tempo ho
              avuto modo di misurarmi in realtà eterogenee e strutturate in modi
              completamente diversi.
            </p>
          </Reveal>
          <ul className="mt-10 flex list-none flex-col gap-10 p-0 md:mt-14 md:gap-16">
            {experiencePath.map((entry, index) => (
              <ExperienceEntry key={entry.id} entry={entry} index={index} />
            ))}
          </ul>
        </div>
      </section>
      <section
        id="percorso"
        className="section-pad bg-surface/90"
        aria-labelledby="study-heading"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="section-label">Percorso</p>
            <h2 id="study-heading" className="section-heading mt-3">
              Formazione
            </h2>
            <p className="prose-body mt-6">
              Fin dalle scuole ho sempre saputo quelli che sarebbero stati i
              miei interessi futuri. Ho cercato di focalizzare da sempre il mio
              percorso di studi sull'informatica
            </p>
          </Reveal>

          <ul className="mt-10 flex list-none flex-col gap-10 p-0 md:mt-14 md:gap-16">
            {studyPath.map((entry, index) => (
              <StudyEntry key={entry.id} entry={entry} index={index} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default StudyPage;
