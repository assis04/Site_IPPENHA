import { useParams, Link } from "react-router-dom";
import { PASTORS } from "../data/constants";
import ContentPageLayout from "../components/ContentPageLayout";

/**
 * Página individual de cada pastor.
 * Rota: /pastores/:slug
 * Reutiliza o ContentPageLayout (mesmo layout de "Quem Somos").
 * O campo `bio` de cada pastor será preenchido futuramente.
 */
export default function PastorPage() {
  const { slug } = useParams();
  const pastor = PASTORS.find((p) => p.slug === slug);

  if (!pastor) {
    return (
      <main className="w-full bg-white font-[Poppins,sans-serif] min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6">
          <h1
            className="text-black mb-4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "33px",
              lineHeight: "1.2",
            }}
          >
            Pastor não encontrado
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            O pastor que você procura não foi encontrado.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#0F715C] text-white px-8 py-3 rounded-full font-medium hover:bg-[#0a5e4c] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2"
          >
            Voltar à página inicial
          </Link>
        </div>
      </main>
    );
  }

  return (
    <ContentPageLayout
      title={pastor.name}
      subtitle={pastor.role}
      image={pastor.image}
      imageAlt={`Foto de ${pastor.name}`}
    >
      {pastor.title ? ( <p className="font-bold">{pastor.title}</p>) : ("")}
      {pastor.bio ? (
        <p>{pastor.bio}</p>
      ) : (
        <p className="text-gray-400 italic">
          Em breve mais informações sobre {pastor.name}.
        </p>
      )}
    </ContentPageLayout>
  );
}
