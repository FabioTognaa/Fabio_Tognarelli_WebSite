import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";

const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));

function App() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-enter">
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
