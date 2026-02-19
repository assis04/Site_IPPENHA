import { ArrowSquareOut } from "@phosphor-icons/react";
import ContentPageLayout from "../components/ContentPageLayout";
import confissaoImg from "../assets/pages/confissao-de-fe-de-westminster.jpg";

const DOCUMENTS = [
  {
    title: "Confissão de Fé de Westminster",
    description:
      "Documento formulado pela Assembleia de Westminster (1643–1649), que expressa de forma sistemática a doutrina reformada. É o principal padrão doutrinário da Igreja Presbiteriana do Brasil.",
    url: "https://www.ipb.org.br/content/Arquivos/A_Confissao_de_Fe_de_Westminster.pdf",
  },
  {
    title: "Catecismo Maior de Westminster",
    description:
      "Composto de 196 perguntas e respostas, abrange de maneira detalhada a doutrina cristã reformada, tratando do que o homem deve crer e do dever que Deus requer dele.",
    url: "https://www.ipb.org.br/content/Arquivos/Catecismo_Maior_de_Westminster.pdf",
  },
  {
    title: "Breve Catecismo de Westminster",
    description:
      "Versão resumida e acessível do Catecismo Maior, com 107 perguntas e respostas que ensinam de forma clara os fundamentos da fé cristã reformada.",
    url: "https://www.ipb.org.br/content/Arquivos/Breve_Catecismo_de_Westminster.pdf",
  },
];

export default function ConfissoesPage() {
  return (
    <ContentPageLayout
      title="Confissões de Fé"
      image={confissaoImg}
      imageAlt="Confissão de Fé de Westminster"
    >
      <p className="mb-20">
        Os Símbolos de Fé oficiais da Igreja Presbiteriana do Brasil são:
        Confissão de Fé de Westminster, Catecismo Maior de Westminster e Breve
        Catecismo de Westminster. Estes documentos, elaborados pela Assembleia de
        Westminster no século XVII, expressam de forma fiel e sistemática o
        ensino das Sagradas Escrituras e constituem os padrões doutrinários que
        norteiam a nossa fé e prática.
      </p>

      {/* Grid de documentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
        {DOCUMENTS.map((doc) => (
          <DocumentCard key={doc.title} doc={doc} />
        ))}
      </div>
    </ContentPageLayout>
  );
}

function DocumentCard({ doc }) {
  return (
    <article className="flex flex-col bg-[#F0F2E4] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Ícone decorativo */}
      <div className="w-14 h-14 rounded-full bg-[#216F48] flex items-center justify-center mb-4 shrink-0">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 4.5C4 3.12 5.12 2 6.5 2H12v7h7v11.5c0 .83-.67 1.5-1.5 1.5h-11A2.5 2.5 0 014 19.5v-15z"
            fill="white"
            opacity="0.3"
          />
          <path
            d="M12 2l7 7h-5.5c-.83 0-1.5-.67-1.5-1.5V2z"
            fill="white"
            opacity="0.6"
          />
          <rect x="7" y="13" width="10" height="1.5" rx="0.75" fill="white" />
          <rect x="7" y="16" width="7" height="1.5" rx="0.75" fill="white" />
        </svg>
      </div>

      {/* Título do documento */}
      <h3
        className="text-black mb-2"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: "1.3",
        }}
      >
        {doc.title}
      </h3>

      {/* Descrição */}
      <p
        className="text-gray-600 mb-5 flex-1"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "1.5",
          textAlign: "left",
        }}
      >
        {doc.description}
      </p>

      {/* Botão */}
      <a
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#216F48] text-white text-sm font-medium px-5 py-3 rounded-full hover:bg-[#1a5a3a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#216F48] focus:ring-offset-2 w-full"
        aria-label={`Visualizar ${doc.title} em PDF (abre em nova aba)`}
      >
        Visualizar o PDF
        <ArrowSquareOut size={18} weight="bold" aria-hidden="true" />
      </a>
    </article>
  );
}
