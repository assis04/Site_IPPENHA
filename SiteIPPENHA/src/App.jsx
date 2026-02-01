import { InstagramLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import IPPENHA from "./assets/IPPENHA.svg";
import logo from "./assets/logo.svg";
import { isSafeUrl } from "./utils/safeUrl";
import { useInstagramFeed } from "./hooks/useInstagramFeed";

const INSTAGRAM_PROFILE_URL_RAW = import.meta.env.VITE_INSTAGRAM_PROFILE_URL || "https://www.instagram.com/ippenha/";
const INSTAGRAM_PROFILE_URL = isSafeUrl(INSTAGRAM_PROFILE_URL_RAW) ? INSTAGRAM_PROFILE_URL_RAW : "https://www.instagram.com/ippenha/";

function App() {
  const { posts, loading, error, displayedCount, setDisplayedCount, retry } = useInstagramFeed();

  return (
    <>
      <header className="lg:w-full lg:h-25 bg-gray-200 items-center justify-center">
        <div className="bg-[#3AAF7D] lg:h-2"></div>
        <ul className=" lg:px-30 lg:h-full flex items-center justify-around bg-white">
          <li><img src={logo} alt="Logo da Igreja Presbiteriana da Penha" /></li>
          <li>Igreja</li>
          <li>Ministerios</li>
          <li>Agenda</li>
          <li>Estudos</li>
          <li>Ação Social</li>
          <li>Baixar o APP</li>
          <li>
            <button className="bg-[#0F715C] text-white px-6 py-2 rounded-3xl">Contribua</button>
          </li>
          <li className="bg-[#d2d2d2] p-1 rounded-3xl"><YoutubeLogoIcon size={29} color="#000000" weight="fill" /></li>
          <li className="bg-[#d2d2d2] p-1 rounded-3xl"><InstagramLogoIcon size={29} color="#000000" weight="regular" /></li>
          
        </ul>
      </header>
      <main className= "lg:w-full lg:h-screen bg-[#F0F2E4]">
        <div className="bg-[url('../assets/Fundo.svg')] lg:w-full lg:h-full flex bg-contain bg-no-repeat">
          <div className="flex w-full  justify-center lg:gap-70 lg:ml-25 lg:mt-25 ">
            <div className=" flex flex-col  text-left items-start lg:w-1/4 lg:gap-2">
              <h1 className="text-black-700 lg:text-3xl font-bold">
                Alcançados pela Graça, <br/>Enviados para Servir.
              </h1>
              <p className="text-white lg:text-2xl">
                Na Igreja Presbiteriana da Penha, vivemos a alegria de pertencer a
                Deus. Somos uma comunidade de fé reformada que ama a Bíblia e se
                dedica com fervor à missão de proclamar Cristo em nosso bairro e
                em todo o mundo. Venha ser parte de uma família que acolhe e
                transforma.
              </p>
              <div className="flex lg:gap-15">
                <button className="bg-[#0F715C] text-white px-4 rounded-3xl">Venha nos visitar </button>
                <button className="border border-white text-white px-4  rounded-3xl">Assistir Online</button>
              </div>
            </div>
            <div>
              <img className= "lg:w-120" src={IPPENHA} alt="Logo IPPENHA"/>
            </div>
          </div>
        </div>
        <div className="lg:h-71 flex lg:w-full bg-white justify-center items-center lg:gap-10 lg:flex lg:mt-10">
          <div className="bg-[#0F715C] text-white w-60 h-60 p-10 text-sm rounded-4xl">Cultos Dominicais 9h | 18h <br /> Culto Hispano 11h</div>
          <div className="bg-[#0F715C] text-white w-60 h-60 p-10 text-sm rounded-4xl"><button>Inscreva-se</button></div>
          <div className="bg-[#0F715C] text-white w-60 h-60 p-10 text-sm rounded-4xl">3</div>
          <div className="bg-[#0F715C] text-white w-60 h-60 p-10 text-sm rounded-4xl">4</div>
          <div className="bg-[#0F715C] text-white w-60 h-60 p-10 text-sm rounded-4xl">5</div>
        </div>

        {/* Seção Instagram */}
        <section
          className="lg:w-full bg-[#F0F2E4] py-12 lg:py-16 px-4 lg:px-8"
          aria-labelledby="instagram-section-heading"
          aria-label="Feed de posts do Instagram"
        >
          <div className="w-full max-w-[995px] mx-auto">
            <h2 id="instagram-section-heading" className="text-2xl lg:text-3xl font-bold text-[#000000] mb-8 text-center flex items-center justify-center gap-2">
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
              <p className="text-center text-gray-600 py-12" role="status" aria-live="polite">
                Carregando posts...
              </p>
            )}
            {error && (
              <div className="text-center py-12" role="alert" aria-live="assertive">
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
                <div className="w-full min-h-[280px] sm:min-h-[400px] lg:min-h-[644px] rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-[46px] p-2 sm:p-3 lg:px-0 lg:py-4">
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
                            className="instagram-caption text-white text-lg sm:text-xl lg:text-2xl text-center font-['Crimson_Text',_serif] w-full"
                            style={{ fontFamily: "'Crimson Text', serif" }}
                          >
                            {post.caption ? post.caption.trim() : "Ver no Instagram"}
                          </p>
                        </div>
                      </a>
                    );})}
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  {displayedCount < posts.length ? (
                    <button
                      type="button"
                      onClick={() => setDisplayedCount((n) => Math.min(n + 6, posts.length))}
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
                      <InstagramLogoIcon size={24} weight="fill" aria-hidden="true" />
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
