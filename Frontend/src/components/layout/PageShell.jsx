import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { Outlet } from "react-router-dom";
function PageShell({ className = "" }) {
  return (
    <div className={`flex min-h-dvh flex-col ${className}`}>
      <SiteHeader />
      <main id="main-content" className="page-enter flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export default PageShell;
