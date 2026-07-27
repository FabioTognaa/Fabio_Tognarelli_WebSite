import SkillGroupCard from "../ui/SkillGroupCard";
import Reveal from "../ui/Reveal";
import { skillGroups } from "../../lib/skills";

const GROUP_ORDER = ["backend", "AI", "frontend", "tooling", "foundations"];

const groups = GROUP_ORDER.map((id) =>
  skillGroups.find((group) => group.id === id),
).filter(Boolean);

function SkillsPage() {
  return (
    <section
      id="competenze"
      className="section-pad scroll-mt-header mx-auto max-w-7xl xl:max-w-[88rem]"
      aria-labelledby="skills-heading"
    >
      <Reveal className="skills-intro">
        <div className="skills-intro__head">
          <p className="section-label">Competenze</p>
          <h1 id="skills-heading" className="section-heading mt-3 max-w-[16ch]">
            Stack e metodo
          </h1>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-6 md:mt-24">
        {groups.map((group, index) => (
          <Reveal
            key={group.id}
            delay={80 + index * 80}
            className={"skills-layout__item"}
          >
            <SkillGroupCard group={group} featured={group.id === "backend"} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default SkillsPage;
