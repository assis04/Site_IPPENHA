import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import AgendaPage from "./pages/AgendaPage";
import QuemSomosPage from "./pages/QuemSomosPage";
import PastorPage from "./pages/PastorPage";
import BaixeAppPage from "./pages/BaixeAppPage";
import ConfissoesPage from "./pages/ConfissoesPage";
import ContribuaPage from "./pages/ContribuaPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#0F715C] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Pular para o conteúdo
      </a>
      <ScrollToTop />
      <Header />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/quem-somos" element={<QuemSomosPage />} />
          <Route path="/confissoes-de-fe" element={<ConfissoesPage />} />
          <Route path="/pastores/:slug" element={<PastorPage />} />
          <Route path="/contribua" element={<ContribuaPage />} />
          <Route path="/baixe-app" element={<BaixeAppPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
