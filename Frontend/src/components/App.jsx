//*  sistema di routing per gestire il cambio di pagina progetti e contatti
//*  LAZY IMPORT: le pagine vengono scaricate solo al loro primo render, non appena si carica il sito
//*  SUSPENSE: gestito in PageShell intorno all'Outlet (shell stabile)
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
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
  return (
    <>
      <ScrollToTop />
      <Routes>
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
    </>
  );
}

export default App;
