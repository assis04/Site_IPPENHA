import { useParams, Link } from "react-router-dom";
import { HouseSimple } from "@phosphor-icons/react";
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
      <main className="w-full bg-white font-[Poppins,sans-serif] overflow-x-hidden">
        <section className="relative max-w-7xl mx-auto">
          <div
            className="absolute hidden lg:block z-0"
            style={{
              left: "-260px",
              top: "-187px",
              width: "327px",
              height: "475px",
              borderRadius: "133px",
              background: "#216F48",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 pt-16 pb-20 lg:pt-24 lg:pb-28 flex flex-col items-center text-center">
            <p
              className="text-[#216F48] font-bold select-none"
              style={{ fontSize: "clamp(5rem, 15vw, 10rem)", lineHeight: 1 }}
              aria-hidden="true"
            >
              404
            </p>

            <h1
              className="text-black mt-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "33px",
                lineHeight: "1.2",
                letterSpacing: "-0.01em",
              }}
            >
              Pastor não encontrado
            </h1>

            <p
              className="text-gray-600 mt-4 max-w-md"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "1.6",
              }}
            >
              O pastor que você procura não foi encontrado.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 bg-[#0F715C] text-white font-medium px-6 py-3 rounded-full hover:bg-[#0a5e4c] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2"
            >
              <HouseSimple size={20} weight="bold" aria-hidden="true" />
              Voltar ao início
            </Link>
          </div>
        </section>
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
