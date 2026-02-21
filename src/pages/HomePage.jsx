import { MapTrifoldIcon, PlayIcon } from "@phosphor-icons/react";
import IPPENHA from "../assets/IPPENHA.svg";
import ConexaoComDeus from "../assets/ConexaoComDeus.svg";
import ConexaoComDeusBlack from "../assets/ConexaoComDeusBlack.svg";
import PenhaKids from "../assets/PenhaKids.svg";
import Hebron from "../assets/Hebron.svg";
import QPalavra from "../assets/QPalavra.svg";
import Integracao from "../assets/Integracao.svg";
import EBT from "../assets/EBT.svg";
import EtepWhite from "../assets/EtepWhite.svg";
import Etep from "../assets/Etep.svg";
import PastorsSection from "../components/PastorsSection";
import InstagramSection from "../components/InstagramSection";
import CarroselCultos from "../components/CarroselCultos";
import { CONTACT, SOCIAL_LINKS, SCHEDULEDATA } from "../data/constants";
import { useRef } from "react";

/**
 * Página inicial — contém Hero, Cards, Bem-vindo, Ministérios, Pastores e Instagram.
 */

const logos = [
  { src: ConexaoComDeusBlack, alt: "Conexão com Deus" },
  { src: EBT, alt: "EBT" },
  { src: Hebron, alt: "Hebron" },
  { src: QPalavra, alt: "Q Palavra" },
  { src: PenhaKids, alt: "Penha Kids" },
  { src: Integracao, alt: "Integração" },
  { src: Etep, alt: "Etep" },
];

export default function HomePage() {
  const carouselRef = useRef(null);
  const isScrolling = useRef(false);

  // Lógica nova, matemática e à prova de bugs para o carrossel
  const scroll = (direction) => {
    if (!carouselRef.current || isScrolling.current) return;
    isScrolling.current = true;

    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const cards = Array.from(container.children);

    // Encontra o centro do container na visão atual
    const containerCenter = scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    // Acha qual card está mais perto do centro no momento
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    // Define o alvo baseado na direção
    let targetIndex = closestIndex;
    if (direction === "left" && closestIndex > 0) {
      targetIndex = closestIndex - 1;
    } else if (direction === "right" && closestIndex < cards.length - 1) {
      targetIndex = closestIndex + 1;
    }

    // Calcula a posição exata para cravar o card alvo no centro
    const targetCard = cards[targetIndex];
    const targetScrollLeft =
      targetCard.offsetLeft -
      container.clientWidth / 2 +
      targetCard.clientWidth / 2;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });

    // Libera o clique de novo após a animação (500ms)
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  };

  return (
    <main className="w-full bg-white font-[Poppins,sans-serif]">
      {/* HERO */}
      <section className="w-full min-h-[90vh] flex items-center bg-[url('../assets/pages/igreja-fachada.jpg')] bg-black/60 bg-blend-overlay lg:bg-[url('../assets/Fundo.svg')] lg:bg-transparent lg:bg-blend-normal bg-no-repeat bg-top bg-cover">
        <div className="max-w-7xl mx-auto px-6 md:px-28 lg:grid lg:grid-cols-2 items-center w-full">
          <div className="flex flex-col gap-6 md:text-justify lg:text-left lg:max-w-90">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white lg:text-gray-900 leading-tight">
              Alcançados pela Graça, Enviados para Servir.
            </h1>

            <p className="text-lg md:text-2xl lg:text-xl text-white">
              Na Igreja Presbiteriana da Penha, vivemos a alegria de pertencer a
              Deus. Somos uma comunidade de fé reformada que ama a Bíblia e se
              dedica com fervor à missão de proclamar Cristo em nosso bairro e
              em todo o mundo. Venha ser parte de uma família que acolhe e
              transforma.
            </p>

            <div className="flex flex-col md:flex-row gap-2 justify-center lg:justify-start">
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0F715C] border border-white/30 text-white text-sm px-3 py-2 rounded-full hover:bg-[#11856c] hover:border-white/70 hover:border transition-colors w-full md:w-1/2 lg:w-1/2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#216F48]"
                aria-label="Como chegar à igreja pelo Google Maps (abre em nova aba)"
              >
                Venha nos visitar
                <MapTrifoldIcon size={20} aria-hidden="true" />
              </a>

              <a
                href={SOCIAL_LINKS.youtubeCultos}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white text-white text-sm px-1 py-2 rounded-full hover:bg-[#11856c] hover:border-white/30 transition-colors w-full md:w-1/2 lg:w-1/2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#216F48]"
                aria-label="Assistir aos cultos online (abre em nova aba)"
              >
                Assistir Online
                <PlayIcon size={20} weight="fill" />
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <img
              src={IPPENHA}
              alt="Imagem da igreja IPPENHA"
              className="max-w-150 w-full"
            />
          </div>
        </div>
      </section>

      {/* Seção Cards */}

      <CarroselCultos />

      {/* Seção seja bem vindo */}
      <section className="w-full bg-[#F0F2E4] ">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center ">
          <div className="w-full lg:w-1/2 aspect-video">
            <iframe
              src="https://www.youtube.com/embed/bEMX8tceKR0"
              title="Vídeo de Boas Vindas"
              loading="lazy"
              className="w-full h-full rounded-2xl shadow-2xl border-none"
              allowFullScreen
            ></iframe>
          </div>
          <div className=" flex flex-col gap-3 py-6 lg:w-150 text-black px-6">
            <h2 className="text-4xl font-bold text-black">
              SEJA BEM-VINDO À IPPENHA!
            </h2>
            <p className="text-sm text-black leading-relaxed">
              Na IP Penha, você encontrará uma igreja acolhedora que pulsa com a
              vida de Cristo em cada detalhe. Somos uma igreja de gerações e
              nosso compromisso é criar um ambiente onde as famílias se sintam
              nutridas, onde o ensino da fé bíblica seja o alicerce para uma
              vida de propósito e significado. Somos uma comunidade viva que
              busca refletir a glória de Deus através de relacionamentos
              autênticos e de um acolhimento que abraça a todos.
            </p>
            <p className="text-sm text-black leading-relaxed">
              Amamos o ensino bíblico profundo e vivemos essa verdade de forma
              contemporânea, com cultos vibrantes que celebram a soberania de
              Deus com alegria e fervor.
            </p>
            <p className="text-sm text-black leading-relaxed">
              Entendemos que o nosso chamado é transbordar o amor de Cristo
              servindo ao mundo com integridade e paixão. Ser missional é o que
              nos identifica, unindo a sã doutrina ao serviço na prática. Venha
              caminhar conosco e descobrir como a fé antiga pode ser
              surpreendentemente atual e transformadora para você e sua família!
            </p>
          </div>
        </div>

        {/* Ministerios */}
      </section>
      <section className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <h2 className="text-2xl font-bold text-black">Ministérios</h2>
        </div>
        <div className="carousel-container">
          <div className="carousel-track">
            {/* Lista 1 */}
            {logos.map((logo, i) => (
              <img
                key={`a-${i}`}
                src={logo.src}
                className="h-16 mx-8 shrink-0"
                alt={logo.alt}
              />
            ))}
            {/* Lista 2 (Cópia exata) */}
            {logos.map((logo, i) => (
              <img
                key={`b-${i}`}
                src={logo.src}
                className="h-16 mx-8 shrink-0"
                alt={logo.alt}
              />
            ))}
          </div>
        </div>
      </section>

      <PastorsSection />

      <InstagramSection className="mt-20" />
    </main>
  );
}
