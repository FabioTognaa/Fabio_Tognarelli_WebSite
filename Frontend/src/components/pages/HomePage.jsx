import Button from "../ui/Button";
import { CV_PATH, CV_FILENAME } from "../../lib/projects";
import { profileImage } from "../../lib/static-assets";

function HomePage() {
  return (
    <section
      id="home"
      className="scroll-mt-header mb-10"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto grid max-w-6xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-hero text-on-hero flex flex-col justify-center px-5 py-14 sm:py-16 md:px-10 md:py-24 lg:min-h-[min(88vh,820px)] lg:px-16 lg:py-28">
          <p className="reveal section-label !text-accent-glow">
            Personal portfolio
          </p>
          <h1
            id="hero-title"
            className="reveal reveal-delay-1 font-display !text-on-hero mt-4 text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] font-extrabold tracking-tight"
          >
            Fabio
            <br />
            Tognarelli
          </h1>
          <p className="reveal reveal-delay-2 text-on-hero/80 mt-6 max-w-md text-lg leading-relaxed font-light">
            Studente di informatica a Pisa. Appassionato di sviluppo web,
            pipeline efficienti AI-oriented e sviluppo sostenibile delle nuove
            tecnologie informatiche.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Button
              variant="primary-dark"
              href={CV_PATH}
              download={CV_FILENAME}
              className="w-full sm:w-auto"
            >
              Scarica CV
            </Button>
            <Button
              variant="ghost-dark"
              to="/projects"
              className="w-full sm:w-auto"
            >
              Vedi progetti
            </Button>
          </div>
        </div>

        <div className="bg-canvas relative flex items-center justify-center px-5 py-10 sm:py-12 md:px-10 lg:py-0">
          <div className="reveal reveal-delay-4 border-line bg-surface motion-lift relative mx-auto aspect-[4/5] w-full max-w-[min(100%,22rem)] overflow-hidden rounded-[1.75rem] border shadow-[0_32px_64px_oklch(20%_0.04_265/0.12)] sm:max-w-md sm:rounded-[2rem]">
            <picture>
              <source
                type="image/webp"
                srcSet={profileImage.srcSet}
                sizes={profileImage.sizes}
              />
              <img
                src={profileImage.src}
                alt="Ritratto di Fabio Tognarelli"
                className="h-full w-full object-cover object-center"
                width={profileImage.width}
                height={profileImage.height}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <div className="from-hero/80 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-6 pt-16">
              <p className="font-display text-on-hero text-sm font-semibold">
                Questo sono io!
              </p>
              <p className="text-on-hero/70 text-xs">JEVIS - Apr 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
