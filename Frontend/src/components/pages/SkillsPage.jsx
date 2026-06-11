import { useCallback, useState } from "react";
import SkillGroupCard from "../ui/SkillGroupCard";
import Reveal from "../ui/Reveal";
import { skillGroups } from "../../lib/skills";

const GROUP_ORDER = ["frontend", "backend", "AI", "tooling", "foundations"];

const groups = GROUP_ORDER.map((id) =>
  skillGroups.find((group) => group.id === id),
).filter(Boolean);

function SkillsPage() {
  const [activeSkillKey, setActiveSkillKey] = useState(null);

  const handleSkillSelect = useCallback((key) => {
    setActiveSkillKey((current) => (current === key ? null : key));
  }, []);

  return (
    <section
      id="competenze"
      className="section-pad scroll-mt-header mx-auto max-w-7xl xl:max-w-[88rem]"
      aria-labelledby="skills-heading"
    >
      <Reveal className="skills-intro">
        <div className="skills-intro__head">
          <p className="section-label">Competenze</p>
          <h2 id="skills-heading" className="section-heading mt-3 max-w-[16ch]">
            Stack e metodo
          </h2>
        </div>
      </Reveal>

      <div className="skills-layout">
        {groups.map((group, index) => (
          <Reveal
            key={group.id}
            delay={80 + index * 80}
            className="skills-layout__item"
          >
            <SkillGroupCard
              group={group}
              activeSkillKey={activeSkillKey}
              onSkillSelect={handleSkillSelect}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default SkillsPage;
