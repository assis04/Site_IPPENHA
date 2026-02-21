import { useRef } from "react";
import { SCHEDULEDATA } from "../data/constants";

export default function SeusCultos({ sectionTitle = "Nossos Cultos", showTitle = false }) {
  const carouselRef = useRef(null);
  const isScrolling = useRef(false);

  const scroll = (direction) => {
    if (!carouselRef.current || isScrolling.current) return;
    isScrolling.current = true;

    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const cards = Array.from(container.children);

    const containerCenter = scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    let targetIndex = closestIndex;
    if (direction === "left" && closestIndex > 0) {
      targetIndex = closestIndex - 1;
    } else if (direction === "right" && closestIndex < cards.length - 1) {
      targetIndex = closestIndex + 1;
    }

    const targetCard = cards[targetIndex];
    const targetScrollLeft =
      targetCard.offsetLeft -
      container.clientWidth / 2 +
      targetCard.clientWidth / 2;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  };

  return (
    <section className="w-full bg-white py-12 lg:py-16 font-poppins overflow-hidden relative" aria-labelledby="cultos-heading">
      <h2
        id="cultos-heading"
        className={showTitle ? "text-2xl font-bold text-black text-center mb-8" : "sr-only"}
      >
        {sectionTitle}
      </h2>

      <div className="w-full max-w-7xl mx-auto relative group">
        {/* Setas de navegação */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none xl:hidden z-10">
          <button
            onClick={() => scroll("left")}
            aria-label="Slide anterior"
            className="pointer-events-auto bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 text-[#3C6F48] hover:bg-white active:scale-95 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Próximo slide"
            className="pointer-events-auto bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 text-[#3C6F48] hover:bg-white active:scale-95 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Container Principal 
          Ajuste do cálculo de centralização:
          - Mobile (w-[320px]) => px-[calc(50vw-160px)]
          - Tablet (w-[360px]) => px-[calc(50vw-180px)]
        */}
        <div
          ref={carouselRef}
          className="flex xl:grid overflow-x-auto snap-x snap-mandatory xl:snap-none xl:overflow-visible xl:grid-cols-5 gap-4 xl:gap-5 px-[calc(50vw-160px)] sm:px-[calc(50vw-180px)] xl:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4"
        >
          {SCHEDULEDATA.map((item, index) => (
            <div
              key={index}
              // Card mais largo e alto no mobile para o texto não ficar espremido
              className={`${item.bg} ${item.textColor} w-[320px] h-[340px] sm:w-[360px] sm:h-[380px] xl:w-full xl:h-auto xl:aspect-[10/11] shrink-0 snap-center xl:snap-align-none rounded-[2.5rem] flex flex-col items-center text-center p-5 xl:p-4 transition-all duration-300 hover:shadow-xl cursor-default`}
            >
              {/* Bloco Superior (45%) */}
              <div className="w-full h-[45%] flex justify-center items-end pb-3 sm:pb-4 shrink-0">
                {item.type === "image" ? (
                  <img
                    src={item.img}
                    alt={item.title || "Logo"}
                    className="max-h-[85%] max-w-[75%] object-contain"
                  />
                ) : (
                  // Título maior para bater com o visual impactante do Figma
                  <h3 className="font-bold text-[1.75rem] sm:text-[2rem] xl:text-[1.45rem] 2xl:text-[1.65rem] leading-[1.1] tracking-tight max-w-[95%]">
                    {item.title}
                  </h3>
                )}
              </div>

              {/* Bloco Central (30%) */}
              <div className="w-full h-[30%] flex flex-col justify-center items-center shrink-0">
                {/* Textos informativos maiores (15px no celular, 17px no tablet) */}
                <p className="font-medium text-[15px] sm:text-[17px] xl:text-[13px] 2xl:text-[14px] opacity-95 leading-snug tracking-tight px-2">
                  {item.info}
                </p>
                {item.extra && (
                  <p className="font-medium text-[15px] sm:text-[17px] xl:text-[13px] 2xl:text-[14px] opacity-95 leading-snug tracking-tight mt-1 sm:mt-1.5 px-2">
                    {item.extra}
                  </p>
                )}
              </div>

              {/* Bloco Inferior (25%) */}
              <div className="w-full h-[25%] flex justify-center items-start pt-2 sm:pt-3 shrink-0">
                {item.action ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.action} (abre em nova aba)`}
                    // Botão mais presente, com maior padding e fonte maior
                    className="border-2 border-current px-8 py-2 sm:px-10 sm:py-2.5 xl:px-6 xl:py-1.5 rounded-full text-[15px] sm:text-[16px] xl:text-[13px] font-bold transition-colors hover:bg-black/10 inline-block"
                  >
                    {item.action}
                  </a>
                ) : (
                  <div className="h-8" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
