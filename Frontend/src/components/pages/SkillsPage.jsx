import SkillGroupCard from "../ui/SkillGroupCard";
import Reveal from "../ui/Reveal";
import { skillGroups } from "../../lib/skills";

const GROUP_ORDER = ["backend", "AI", "frontend", "tooling", "foundations"];

const groups = GROUP_ORDER.map((id) =>
  skillGroups.find((group) => group.id === id),
).filter(Boolean);

const GROUP_LAYOUT = {
  backend: "skills-layout__item md:col-span-2 lg:col-span-7 lg:row-span-2",
  AI: "skills-layout__item lg:col-span-5",
  frontend: "skills-layout__item lg:col-span-5",
  tooling: "skills-layout__item lg:col-span-6",
  foundations: "skills-layout__item lg:col-span-6",
};

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
            className={GROUP_LAYOUT[group.id] ?? "skills-layout__item"}
          >
            <SkillGroupCard group={group} featured={group.id === "backend"} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default SkillsPage;
