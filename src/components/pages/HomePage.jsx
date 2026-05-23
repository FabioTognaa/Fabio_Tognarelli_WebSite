import PageShell from "../layout/PageShell";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import StudyTimeline from "../sections/StudyTimeline";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";

function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <AboutSection />
      <StudyTimeline />
      <SkillsSection />
      <ProjectsSection />
    </PageShell>
  );
}

export default HomePage;
