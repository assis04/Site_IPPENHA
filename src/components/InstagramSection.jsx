import { InstagramLogoIcon } from "@phosphor-icons/react";
import { useInstagramFeed } from "../hooks/useInstagramFeed";
import { INSTAGRAM_PROFILE_URL } from "../data/constants";

/**
 * Seção do feed do Instagram.
 * Exibe grid de posts com lazy-loading, paginação e fallback de erro.
 */
export default function InstagramSection({ className = "" }) {
  const { posts, loading, error, displayedCount, setDisplayedCount, retry } =
    useInstagramFeed();

  return (
    <section
      className={`w-full min-h-[90vh] bg-white bg-[url('../assets/bgInstagram.svg')] py-12 lg:py-16 px-4 lg:px-8 bg-no-repeat bg-top bg-cover ${className}`.trim()}
      aria-labelledby="instagram-heading"
      aria-label="Feed de posts do Instagram"
    >
      <div className="max-w-7xl px-6 mx-auto">
        <h2
          id="instagram-heading"
          className="text-2xl lg:text-3xl font-bold text-black mb-8 text-center flex items-center justify-center gap-2"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2 rounded"
            aria-label="Instagram da IPPENHA (abre em nova aba)"
          >
            <InstagramLogoIcon size={32} weight="fill" aria-hidden="true" />
            Instagram IPPENHA
          </a>
        </h2>

        {/* Estado: carregando */}
        {loading && (
          <p className="text-center text-gray-600 py-12" role="status" aria-live="polite">
            Carregando posts...
          </p>
        )}

        {/* Estado: erro */}
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

        {/* Estado: posts carregados */}
        {!loading && !error && posts.length > 0 && (
          <>
            <div className="w-full min-h-70 sm:min-h-100 lg:min-h-161 rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-11.5 p-2 sm:p-3 lg:px-0 lg:py-4">
                {posts.slice(0, displayedCount).map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
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
                  aria-label="Instagram da IPPENHA (abre em nova aba)"
                >
                  <InstagramLogoIcon size={24} weight="fill" aria-hidden="true" />
                  Ver no Instagram
                </a>
              )}
            </div>
          </>
        )}

        {/* Estado: vazio */}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-600 py-12" role="status">
            Nenhum post encontrado.
          </p>
        )}
      </div>
    </section>
  );
}

/* ─── Sub-componente: card individual de post ─── */

function PostCard({ post, index }) {
  const label = post.caption
    ? `Ver post ${index + 1} no Instagram: ${post.caption.slice(0, 100)}${post.caption.length > 100 ? "…" : ""} (abre em nova aba)`
    : `Ver post ${index + 1} no Instagram (abre em nova aba)`;

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block aspect-square w-full rounded overflow-hidden bg-gray-200 shadow-md hover:shadow-lg transition-all relative focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2"
      aria-label={label}
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
        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 flex items-center justify-center p-2 sm:p-3 lg:p-4 overflow-hidden motion-reduce:transition-none"
        aria-hidden="true"
      >
        <span className="instagram-caption text-white text-[clamp(0.55rem,2.2vw,1.4rem)] leading-snug text-center w-full">
          {post.caption ? post.caption.trim() : "Ver no Instagram"}
        </span>
      </div>
    </a>
  );
}
