import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Rola a página para o topo sempre que a rota muda.
 * Deve ser renderizado dentro do BrowserRouter.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
