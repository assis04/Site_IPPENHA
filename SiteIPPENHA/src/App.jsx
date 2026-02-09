import { InstagramLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import IPPENHA from "./assets/IPPENHA.svg";
import logo from "./assets/logo.svg";
import ConexaoComDeus from "./assets/ConexaoComDeus.svg";
import PenhaKids from "./assets/PenhaKids.svg";
import Hebron from "./assets/Hebron.svg";
import QPalavra from "./assets/QPalavra.svg";
import Integraçao from "./assets/Integraçao.svg";
import EBT from "./assets/EBT.svg";
import { isSafeUrl } from "./utils/safeUrl";
import { useInstagramFeed } from "./hooks/useInstagramFeed";

const INSTAGRAM_PROFILE_URL_RAW =
  import.meta.env.VITE_INSTAGRAM_PROFILE_URL ||
  "https://www.instagram.com/ippenha/";
const INSTAGRAM_PROFILE_URL = isSafeUrl(INSTAGRAM_PROFILE_URL_RAW)
  ? INSTAGRAM_PROFILE_URL_RAW
  : "https://www.instagram.com/ippenha/";

function App() {
  const { posts, loading, error, displayedCount, setDisplayedCount, retry } =
    useInstagramFeed();

  return (
    <>
      <header className="w-full bg-white">
        {/* faixa superior */}
        <div className="h-2 bg-[#3AAF7D]" />

        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo da Igreja Presbiteriana da Penha"
              className="h-12"
            />
          </div>

          {/* Links */}
          <ul className="hidden lg:flex gap-8 items-center text-gray-700 font-medium">
            <li className="hover:text-[#0F715C] cursor-pointer">Igreja</li>
            <li className="hover:text-[#0F715C] cursor-pointer">Ministérios</li>
            <li className="hover:text-[#0F715C] cursor-pointer">Agenda</li>
            <li className="hover:text-[#0F715C] cursor-pointer">Estudos</li>
            <li className="hover:text-[#0F715C] cursor-pointer">Ação Social</li>
            <li className="hover:text-[#0F715C] cursor-pointer">
              Baixar o App
            </li>
          </ul>

          {/* Ações */}
          <div className="flex items-center gap-4">
            <button className="bg-[#0F715C] text-white px-6 py-2 rounded-full hover:opacity-90">
              Contribua
            </button>

            <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
              <YoutubeLogoIcon size={22} weight="fill" />
            </div>

            <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
              <InstagramLogoIcon size={22} />
            </div>
          </div>
        </nav>
      </header>

      <main className="w-full bg-[#F0F2E4]">
        {/* HERO */}

        <section className=" relative w-full min-h-[90vh] flex items-center bg-[url('../assets/Fundo.svg')] bg-no-repeat bg-top bg-cover">
          {/* CONTEÚDO */}

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Texto */}

            <div className="flex flex-col gap-6 max-w-lg lg:pl-30">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight ">
                Alcançados pela Graça, Enviados para Servir.
              </h1>

              <p className="text-xl text-white text-justify">
                Na Igreja Presbiteriana da Penha, vivemos a alegria de pertencer
                a Deus. Somos uma comunidade de fé reformada que ama a Bíblia e
                se dedica com fervor à missão de proclamar Cristo em nosso
                bairro e em todo o mundo. Venha ser parte de uma família que
                acolhe e transforma.
              </p>

              <div className="flex gap-5 justify-around">
                <button className="bg-[#0F715C] text-white px-6 py-3 rounded-full">
                  Venha nos visitar
                </button>

                <button className="border border-white text-white px-6 py-3 rounded-full">
                  Assistir Online
                </button>
              </div>
            </div>

            {/* Imagem */}
            <div className="flex justify-center">
              <img
                src={IPPENHA}
                alt="Logo IPPENHA"
                className="w-full max-w-105"
              />
            </div>
          </div>
        </section>

        {/* Seção Cards */}

        <section className="w-full bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="bg-[#3C6F48] text-white p-8 flex flex-col rounded-3xl text-center justify-center">
              <h3 className="font-bold text-2xl">Cultos Dominicais</h3>
              <p>9h | 18h Culto Hispano 11h</p>
            </div>

            <div className="bg-[#F0F2E4] text-black p-8 rounded-3xl flex flex-col items-center text-center  justify-center">
              <img src={EBT} alt="" />
              <button className="font-semibold">Inscreva-se</button>
            </div>

            <div className="bg-[#1F3827] text-white p-8 rounded-3xl flex flex-col items-center text-center  justify-center">
              <img src={ConexaoComDeus} alt="Conexão com Deus" />
              <p>Segunda-feira 20h</p>
            </div>

            <div className="bg-[#E0F2CF] text-black p-8 rounded-3xl flex flex-col items-center text-center  justify-center">
              <h3 className="font-bold text-2xl">Tarde da Esperança</h3>
              <p>Quarta-feira 14h30</p>
            </div>

            <div className="bg-[#3C6F48] text-white p-8 rounded-3xl flex flex-col  items-center text-center  justify-center">
              <h3 className="font-bold text-2xl">ETEP</h3>
              <p>Quinta-feira 20h</p>
            </div>
          </div>
        </section>

        {/* Seção seja bem vindo */}

        <section className="w-full bg-[#466a63] ">
          <div className="flex max-w-7xl mx-auto gap-30 items-center px-6">
            <div>
              <iframe
                width="525"
                height="315"
                src="https://www.youtube.com/embed/bEMX8tceKR0?si=Ht1gLjlr61SpxsUU"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div>
              <h1>SEJA BEM VINDO À IPPENHA!</h1>
              <p>
                Na IP Penha, você encontrará uma igreja acolhedora que pulsa com
                a vida de Cristo em cada detalhe. Somos uma igreja de gerações e
                nosso compromisso é criar um ambiente onde as famílias se sintam
                nutridas, onde o ensino da fé bíblica seja o alicerce para uma
                vida de propósito e significado. Somos uma comunidade viva que
                busca refletir a glória de Deus através de relacionamentos
                autênticos e de um acolhimento que abraça a todos.
              </p>
              <p>
                
                Amamos o ensino bíblico profundo e vivemos essa verdade de forma
                contemporânea, com cultos vibrantes que celebram a soberania de
                Deus com alegria e fervor.
              </p>
              <p>
                Entendemos que o nosso chamado é transbordar o amor de Cristo
                servindo ao mundo com integridade e paixão. Ser missional é o
                que nos identifica, unindo a sã doutrina ao serviço na prática.
                Venha caminhar conosco e descobrir como a fé antiga pode ser
                surpreendentemente atual e transformadora para você e sua
                família!
              </p>
            </div>
          </div>
        </section>

        {/* Seção Instagram */}
        <section
          className="lg:w-full bg-[#F0F2E4] py-12 lg:py-16 px-4 lg:px-8"
          aria-labelledby="instagram-section-heading"
          aria-label="Feed de posts do Instagram"
        >
          <div className="w-full max-w-248.75 mx-auto">
            <h2
              id="instagram-section-heading"
              className="text-2xl lg:text-3xl font-bold text-[#000000] mb-8 text-center flex items-center justify-center gap-2"
            >
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2 rounded"
                aria-label="Abrir perfil do Instagram IPPENHA no Instagram (abre em nova aba)"
              >
                <InstagramLogoIcon size={32} weight="fill" aria-hidden="true" />
                Instagram IPPENHA
              </a>
            </h2>
            {loading && (
              <p
                className="text-center text-gray-600 py-12"
                role="status"
                aria-live="polite"
              >
                Carregando posts...
              </p>
            )}
            {error && (
              <div
                className="text-center py-12"
                role="alert"
                aria-live="assertive"
              >
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  type="button"
                  onClick={retry}
                  className="cursor-pointer bg-transparent text-black border border-black px-6 py-2 rounded-3xl font-medium hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2"
                  aria-label="Tentar carregar o feed do Instagram novamente"
                >
                  Tentar novamente
                </button>
              </div>
            )}
            {!loading && !error && posts.length > 0 && (
              <>
                {/* Container do grid */}
                <div className="w-full min-h-70 sm:min-h-100 lg:min-h-161 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-11.5 p-2 sm:p-3 lg:px-0 lg:py-4">
                    {posts.slice(0, displayedCount).map((post, index) => {
                      const postLabel = post.caption
                        ? `Ver post ${index + 1} no Instagram: ${post.caption.slice(0, 100)}${post.caption.length > 100 ? "…" : ""}`
                        : `Ver post ${index + 1} no Instagram`;
                      return (
                        <a
                          key={post.id}
                          href={post.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block aspect-square w-full rounded overflow-hidden bg-gray-200 shadow-md hover:shadow-lg transition-all relative focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2"
                          aria-label={postLabel}
                        >
                          {post.media_type === "VIDEO" ? (
                            <video
                              src={post.media_url}
                              poster={post.thumbnail_url}
                              className="w-full h-full object-cover"
                              autoPlay
                              muted
                              playsInline
                              loop
                              aria-hidden="true"
                              tabIndex={-1}
                            />
                          ) : (
                            <img
                              src={post.thumbnail_url || post.media_url}
                              alt=""
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          )}
                          {/* Overlay no hover */}
                          <div
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 flex items-center justify-center p-3 overflow-hidden motion-reduce:transition-none"
                            aria-hidden="true"
                          >
                            <p
                              className="instagram-caption text-white text-lg sm:text-xl lg:text-2xl text-center font-['Crimson_Text',serif] w-full"
                              style={{ fontFamily: "'Crimson Text', serif" }}
                            >
                              {post.caption
                                ? post.caption.trim()
                                : "Ver no Instagram"}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  {displayedCount < posts.length ? (
                    <button
                      type="button"
                      onClick={() =>
                        setDisplayedCount((n) => Math.min(n + 6, posts.length))
                      }
                      className="cursor-pointer bg-transparent text-black border border-black px-8 py-3 rounded-3xl font-medium hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2"
                      aria-label="Carregar mais 6 posts do Instagram"
                    >
                      Ver mais
                    </button>
                  ) : (
                    <a
                      href={INSTAGRAM_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer bg-transparent text-black border border-black px-8 py-3 rounded-3xl font-medium hover:bg-black/5 transition-colors inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2"
                      aria-label="Ver perfil completo no Instagram (abre em nova aba)"
                    >
                      <InstagramLogoIcon
                        size={24}
                        weight="fill"
                        aria-hidden="true"
                      />
                      Ver no Instagram
                    </a>
                  )}
                </div>
              </>
            )}
            {!loading && !error && posts.length === 0 && (
              <p className="text-center text-gray-600 py-12" role="status">
                Nenhum post encontrado.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
