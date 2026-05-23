import { useCallback, useState } from "react";
import SkillGroupCard from "../ui/SkillGroupCard";
import Reveal from "../ui/Reveal";
import { skillGroups } from "../../lib/skills";

function SkillsSection() {
  const [featured, ...rest] = skillGroups;
  const [activeSkillKey, setActiveSkillKey] = useState(null);

  const handleSkillSelect = useCallback((key) => {
    setActiveSkillKey((current) => (current === key ? null : key));
  }, []);

  return (
    <section
      id="competenze"
      className="section-pad mx-auto max-w-6xl scroll-mt-header"
      aria-labelledby="skills-heading"
    >
      <Reveal>
        <p className="section-label">Competenze</p>
        <h2 id="skills-heading" className="section-heading mt-3">
          Stack e metodo
        </h2>
        <p className="prose-body mt-6">
          Frontend moderno al centro, con basi solide di programmazione e
          attenzione a leggibilità, accessibilità e manutenzione.{" "}
          <span className="skills-hint text-ink-soft">
            Tocca una competenza per vedere dove la applico.
          </span>
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:gap-5 md:mt-12 md:grid-cols-12 md:items-stretch md:gap-6">
        <Reveal className="md:col-span-7">
          <SkillGroupCard
            group={featured}
            variant="featured"
            activeSkillKey={activeSkillKey}
            onSkillSelect={handleSkillSelect}
          />
        </Reveal>

        <div className="flex flex-col gap-5 md:col-span-5 md:h-full">
          {rest.map((group, index) => (
            <Reveal key={group.id} delay={80 + index * 80} className="flex-1">
              <SkillGroupCard
                group={group}
                activeSkillKey={activeSkillKey}
                onSkillSelect={handleSkillSelect}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
