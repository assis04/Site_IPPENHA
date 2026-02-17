import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import AgendaPage from "./pages/AgendaPage";
import QuemSomosPage from "./pages/QuemSomosPage";
import PastorPage from "./pages/PastorPage";
import ConfissoesPage from "./pages/ConfissoesPage";

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
