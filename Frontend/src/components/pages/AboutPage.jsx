import Reveal from "../ui/Reveal";
import { Link } from "react-router-dom";
import { DIRECTIONS } from "../../lib/about";

function AboutQuote({ quote, author, delay = 0 }) {
  return (
    <Reveal as="figure" delay={delay} className="about-quote">
      <span className="about-quote__mark" aria-hidden>
        "
      </span>
      <blockquote className="about-quote__text">
        <p>{quote}</p>
      </blockquote>
      <figcaption className="about-quote__author">{author}</figcaption>
    </Reveal>
  );
}

function AboutPage() {
  return (
    <section
      id="about"
      className="section-pad section-pad--after-hero scroll-mt-header mx-auto max-w-7xl"
      aria-labelledby="about-heading"
    >
      <Reveal>
        <p className="section-label">Chi sono</p>
        <h1
          id="about-heading"
          className="section-heading mt-3 max-w-[30ch] lg:max-w-[34ch]"
        >
          Determinato e pronto a creare valore nella società
        </h1>
      </Reveal>

      <div className="about-pairs">
        <div className="about-row">
          <AboutQuote
            quote="La Rivoluzione Umana di un singolo individuo condurrà al cambiamento nel destino dell'umanità"
            author="Daisaku Ikeda"
          />

          <Reveal as="p" className="about-prose" delay={80}>
            In un mondo dove l'AI sembra essere la soluzione per tutto, voglio
            costruire un ecosistema sostenibile perché sia implementata in modo
            efficace, rispettosa del pianeta e orientata al bene comune.
          </Reveal>
        </div>

        <div className="about-row">
          <Reveal as="p" className="about-prose" delay={120}>
            Faccio della costanza il mio pilastro principale. La vera chiave per
            progredire è imparare giorno dopo giorno, acquisendo conoscenze e
            abilità che mi aiutino a restare uno sviluppatore al passo con i
            tempi.
          </Reveal>
          <AboutQuote
            quote="Il viaggio da Kamakura a Kyoto dura dodici giorni: se viaggi per undici giorni e ti fermi quando ne manca uno solo, come puoi ammirare la luna sopra la capitale?"
            author="Nichiren Daishonin"
            delay={200}
          />
        </div>

        {/* SEZIONE DOVE STO ANDANDO*/}
        <Reveal as="div" className="about-directions" delay={280}>
          <h2 className="section-heading">Dove sto andando</h2>
          <p className="prose-body mt-3 text-xl">
            Avere una direzione chiara al giorno d'oggi può fare veramente la
            differenza
          </p>
          <ul className="roadmap-list mt-8 list-none p-0">
            {DIRECTIONS.map((item, index) => (
              <li key={item.label} className="roadmap-list__step">
                <span className="roadmap-list__num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="roadmap-list__content">
                  <p className="roadmap-list__label">{item.label}</p>
                  <p className="roadmap-list__text">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/projects" className="link-arrow mt-8 inline-flex">
            Vedi i progetti
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutPage;
