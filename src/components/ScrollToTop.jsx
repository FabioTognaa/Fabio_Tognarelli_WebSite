//*resetta lo scroll in cima quando si cambia pagina tramite routing

import { useLocation } from "react-router-dom";
import { useEffect } from "react";


export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
