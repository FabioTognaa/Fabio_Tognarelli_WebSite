import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { CV_PATH } from "../../lib/projects";

function AboutSection() {
  return (
    <section
      id="about"
      className="section-pad section-pad--after-hero mx-auto max-w-6xl scroll-mt-header"
      aria-labelledby="about-heading"
    >
      <Reveal>
        <p className="section-label">Chi sono</p>
        <h2 id="about-heading" className="section-heading mt-3">
          Determinato, creativo, pronto al mercato del lavoro
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-8 md:mt-12 md:gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal as="div" className="prose-body space-y-5" delay={80}>
          <p>
            Studio informatica all&apos;Università di Pisa e mi alleno ogni
            giorno su progetti web reali: componenti React, API leggere,
            interfacce responsive.
          </p>
          <p>
            Cerco un team che mi faccia crescere velocemente: imparare dai
            senior, consegnare feature utili e diventare un software engineer
            affidabile.
          </p>
        </Reveal>

        <Reveal
          as="div"
          className="surface-panel flex flex-col justify-between p-8 md:p-10"
          delay={160}
        >
          <div>
            <h3 className="font-display text-xl font-bold text-ink">
              Obiettivi
            </h3>
            <ul className="mt-4 space-y-3 text-ink-muted">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>
                  Specializzarmi nel tempo su data e AI applicata al prodotto
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>
                  Mostrare proof of work concreto, non solo liste di tecnologie
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>
                  Collaborare su codice pulito, review e standard di team
                </span>
              </li>
            </ul>
          </div>
          <Button
            href={CV_PATH}
            download={CV_PATH}
            className="mt-8 w-full sm:w-auto"
          >
            Scarica CV
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutSection;
