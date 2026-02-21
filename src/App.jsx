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
      <ScrollToTop />
      <Header />
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
      <Footer />
    </>
  );
}

export default App;
