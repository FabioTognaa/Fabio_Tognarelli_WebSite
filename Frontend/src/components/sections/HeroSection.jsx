import Button from "../ui/Button";
import { CV_PATH } from "../../lib/projects";

const HERO_IMAGE = {
  src: "/images/tognarelli-800.webp",
  srcSet:
    "/images/tognarelli-480.webp 480w, /images/tognarelli-800.webp 800w, /images/tognarelli-1200.webp 1200w",
  sizes: "(min-width: 640px) 28rem, min(100vw - 2.5rem, 22rem)",
  width: 800,
  height: 1000,
};

function HeroSection() {
  return (
    <section
      id="home"
      className="scroll-mt-header border-b border-line"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto grid max-w-6xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center bg-hero px-5 py-14 text-on-hero sm:py-16 md:px-10 md:py-24 lg:min-h-[min(88vh,820px)] lg:px-16 lg:py-28">
          <p className="reveal section-label !text-accent-glow">Portfolio 2026</p>
          <h1
            id="hero-title"
            className="reveal reveal-delay-1 mt-4 font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] font-extrabold tracking-tight !text-on-hero"
          >
            Fabio
            <br />
            Tognarelli
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-md text-lg font-light leading-relaxed text-on-hero/80">
            Studente di informatica a Pisa. Sviluppo web full stack con focus su
            React, UI curate e codice che regge una code review.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Button
              variant="primary-dark"
              href={CV_PATH}
              download={CV_PATH}
              className="w-full sm:w-auto"
            >
              Scarica CV
            </Button>
            <Button
              variant="ghost-dark"
              href="/#progetti"
              className="w-full sm:w-auto"
            >
              Vedi progetti
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center bg-canvas px-5 py-10 sm:py-12 md:px-10 lg:py-0">
          <div
            className="reveal reveal-delay-4 relative mx-auto aspect-[4/5] w-full max-w-[min(100%,22rem)] overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[0_32px_64px_oklch(20%_0.04_265/0.12)] motion-lift sm:max-w-md sm:rounded-[2rem]"
          >
            <picture>
              <source
                type="image/webp"
                srcSet={HERO_IMAGE.srcSet}
                sizes={HERO_IMAGE.sizes}
              />
              <img
                src={HERO_IMAGE.src}
                alt="Ritratto di Fabio Tognarelli"
                className="h-full w-full object-cover object-center"
                width={HERO_IMAGE.width}
                height={HERO_IMAGE.height}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hero/80 to-transparent p-6 pt-16">
              <p className="font-display text-sm font-semibold text-on-hero">
                Full stack in crescita
              </p>
              <p className="text-xs text-on-hero/70">Università di Pisa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
