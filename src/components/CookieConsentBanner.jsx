import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCookieConsent } from "../context/CookieConsentContext";

/**
 * Banner LGPD — consentimento de cookies (padrão ANPD).
 * Botões com visibilidade equivalente conforme orientação da ANPD.
 *
 * Acessibilidade (WCAG 2.1):
 *  - role="dialog" com aria-labelledby / aria-describedby
 *  - aria-live="polite" para leitores de tela detectarem o aparecimento
 *  - Foco automático no container ao aparecer (sem prender o foco)
 *  - motion-reduce respeita prefers-reduced-motion
 */
export default function CookieConsentBanner() {
  const { consent, hydrated, isPersisting, setConsent } = useCookieConsent();
  const bannerRef = useRef(null);

  const visible = hydrated && consent === null;

  useEffect(() => {
    if (visible && bannerRef.current) {
      bannerRef.current.focus({ preventScroll: true });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      tabIndex={-1}
      className="fixed bottom-0 left-0 right-0 z-[10000] p-4 md:p-5 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] border-t border-black/10 bg-[#F0F2E4] text-gray-900 outline-none"
      role="dialog"
      aria-modal="false"
      aria-live="polite"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div>
          <h2
            id="cookie-banner-title"
            className="text-base font-semibold text-[#216F48] font-[Poppins,sans-serif]"
          >
            Privacidade e cookies
          </h2>
          <p
            id="cookie-banner-desc"
            className="text-sm text-gray-700 mt-2 leading-relaxed font-[Poppins,sans-serif]"
          >
            Usamos cookies essenciais para o funcionamento do site. O vídeo do
            YouTube e o feed do Instagram só são carregados com a sua
            autorização. Você pode alterar sua escolha a qualquer momento no
            rodapé.{" "}
            <Link
              to="/politica-de-privacidade#cookies"
              className="text-[#216F48] underline font-medium focus:outline-none focus:ring-2 focus:ring-[#216F48] focus:ring-offset-2 rounded"
            >
              Saiba mais
            </Link>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
          <button
            type="button"
            onClick={() => void setConsent("essential")}
            disabled={isPersisting}
            className="order-2 sm:order-1 cursor-pointer px-6 py-2.5 rounded-full text-sm font-medium border-2 border-[#216F48] text-[#216F48] hover:bg-[#216F48]/10 transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[#216F48] focus:ring-offset-2 font-[Poppins,sans-serif] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => void setConsent("all")}
            disabled={isPersisting}
            className="order-1 sm:order-2 cursor-pointer px-6 py-2.5 rounded-full text-sm font-medium border-2 border-[#216F48] bg-[#216F48] text-white hover:bg-[#1a5a3a] hover:border-[#1a5a3a] transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[#216F48] focus:ring-offset-2 font-[Poppins,sans-serif] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
