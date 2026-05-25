//*  sistema di routing per gestire il cambio di pagina progetti e contatti
//*  LAZY IMPORT: le pagine vengono scaricate solo al loro primo render, non appena si carica il sito
//*  SUSPENSE: cosa viene mostrato quando non viene caricata la lazy page
import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./ScrollToTop";

const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));

function App() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-enter">
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
