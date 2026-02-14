import {
  InstagramLogoIcon,
  YoutubeLogoIcon,
  MapTrifoldIcon,
  EnvelopeSimple,
  Phone,
  MapPin,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  NAV_LINKS,
  CONTACT,
  SOCIAL_LINKS,
  SCHEDULES,
} from "../data/constants";

/**
 * Footer do site.
 * Estrutura: onda SVG (Figma) → conteúdo 4-colunas → barra de copyright.
 */
export default function Footer() {
  return (
    <footer
      className="w-full text-white relative bg-[#F0F2E4] font-[Poppins,sans-serif]"
    >
      {/* Onda curva do topo — path extraído do Figma */}
      <div className="w-full overflow-hidden leading-[0] -mb-px">
        <svg
          className="w-full h-auto block"
          viewBox="0 -6 1440 86"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="footerWaveGradient"
              x1="0"
              y1="40"
              x2="1440"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.2" stopColor="#216F48" />
              <stop offset="0.75" stopColor="#36A268" />
            </linearGradient>
          </defs>
          <path
            d="M0 80 L0 60.6558 L100.07 60.0181 C100.07 60.0181 100.07 60.0181 201.14 55.9379 C302.21 51.8577 403.78 39.4381 592.411 16.8469 C781.042 -5.74432 948.659 0.916461 1036.22 0.916469 C1123.78 0.916476 1440 20.3871 1440 20.3871 L1440 80 Z"
            fill="url(#footerWaveGradient)"
          />
        </svg>
      </div>

      {/* Área com gradiente (conteúdo + copyright) */}
      <div style={{ background: "linear-gradient(90deg, #216F48 20%, #36A268 75%)" }}>
        {/* Grid de conteúdo */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Coluna 1 — Logo e descrição */}
          <div className="flex flex-col gap-4">
            <img
              src={logo}
              alt="Logo da Igreja Presbiteriana da Penha"
              className="h-14 w-fit brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-white/85 max-w-xs">
              Alcançados pela Graça, Enviados para Servir. Somos uma comunidade
              de fé reformada que ama a Bíblia e se dedica a proclamar Cristo.
            </p>

            {/* Redes sociais */}
            <div className="flex gap-3 mt-2">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/15 p-2.5 rounded-full hover:bg-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#216F48]"
                aria-label="Instagram da IPPENHA (abre em nova aba)"
              >
                <InstagramLogoIcon size={20} weight="fill" aria-hidden="true" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/15 p-2.5 rounded-full hover:bg-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#216F48]"
                aria-label="YouTube da IPPENHA (abre em nova aba)"
              >
                <YoutubeLogoIcon size={20} weight="fill" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Coluna 2 — Navegação */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Navegação</h3>
            <nav aria-label="Links do rodapé">
              <ul className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-sm text-white/85 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-white/85 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Coluna 3 — Horários */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Cultos e Programações</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white/85">
              {SCHEDULES.map((item) => (
                <li key={item.name}>
                  <span className="font-medium text-white">{item.name}</span>
                  <br />
                  {item.time}
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 — Contato */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/85">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} weight="fill" className="mt-0.5 shrink-0 text-white" aria-hidden="true" />
                <span>
                  {CONTACT.address}
                  <br />
                  {CONTACT.city}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} weight="fill" className="shrink-0 text-white" aria-hidden="true" />
                <a href={CONTACT.phoneHref} className="hover:text-white transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <EnvelopeSimple size={18} weight="fill" className="shrink-0 text-white" aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white text-sm px-5 py-2.5 rounded-full hover:bg-white/25 transition-colors w-fit focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#216F48]"
              aria-label="Como chegar à igreja pelo Google Maps (abre em nova aba)"
            >
              <MapTrifoldIcon size={18} aria-hidden="true" />
              Como chegar
            </a>
          </div>
        </div>

        {/* Barra de copyright */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/70">
            <p>
              &copy; {new Date().getFullYear()} Igreja Presbiteriana da Penha.
              Todos os direitos reservados.
            </p>
            <p>
              Igreja filiada à{" "}
              <a
                href="https://www.ipb.org.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                Igreja Presbiteriana do Brasil
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
