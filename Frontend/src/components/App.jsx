//*  sistema di routing per gestire il cambio di pagina progetti e contatti
//*  LAZY IMPORT: le pagine vengono scaricate solo al loro primo render, non appena si carica il sito
//*  SUSPENSE: cosa viene mostrato quando non viene caricata la lazy page
import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import PageShell from "./layout/PageShell";
//* dichiarazione lazy di ogni pagina per efficientare
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const StudyPage = lazy(() => import("./pages/StudyPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
function App() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-enter">
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes location={location}>
          <Route element={<PageShell />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="studies" element={<StudyPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
