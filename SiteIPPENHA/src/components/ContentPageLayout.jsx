/**
 * Layout reutilizável para páginas institucionais (Quem Somos, Pastores, etc.).
 *
 * Props:
 *  - title       (string)  — título destacado da página
 *  - subtitle    (string)  — subtítulo (ex.: cargo do pastor) (opcional)
 *  - image       (string)  — URL da imagem (opcional)
 *  - imageAlt    (string)  — alt-text da imagem
 *  - highlight   (string)  — frase de destaque (opcional)
 *  - children    (node)    — conteúdo textual
 */
export default function ContentPageLayout({
  title,
  subtitle,
  image,
  imageAlt = "",
  highlight,
  children,
}) {
  return (
    <main className="w-full bg-white font-[Poppins,sans-serif] overflow-x-hidden">
      <section className="relative max-w-7xl mx-auto">
        {/* ── Forma decorativa esquerda (verde escuro) ──
             left: -260px  → apenas ~67 px visíveis na borda esquerda
             top:  -187px  → subiu 40 px em relação ao posicionamento original (-147) */}
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

        {/* ── Forma decorativa direita (verde claro, atrás da foto) ──
             top: -92px → subiu 40 px em relação ao posicionamento original (-52) */}
        {image && (
          <div
            className="absolute hidden lg:block z-0"
            style={{
              right: "-103px",
              top: "-92px",
              width: "327px",
              height: "475px",
              borderRadius: "133px",
              background: "#36A268",
            }}
            aria-hidden="true"
          />
        )}

        {/* ── Conteúdo ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 pt-10 pb-12 lg:pt-16 lg:pb-16">
          {/* Imagem flutuante à direita */}
          {image && (
            <img
              src={image}
              alt={imageAlt}
              className="float-right ml-6 mb-6 lg:ml-10 lg:mb-6 w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[451px] object-cover"
              style={{
                borderRadius: "133px",
                aspectRatio: "451 / 415",
              }}
            />
          )}

          {/* Título — Poppins Bold 33px
               line-height 1.2 (120%) para títulos multi-linha
               letter-spacing -0.01em para manter coesão visual */}
          <h1
            className="text-black"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "33px",
              lineHeight: "1.2",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="text-[#216F48] mt-2"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "1.6",
                letterSpacing: "0.015em",
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Espaçador — no desktop empurra o texto para após o fundo inferior da forma verde */}
          <div className="h-6 lg:h-[200px]" aria-hidden="true" />

          {/* Texto do conteúdo — Poppins Regular 20px
               line-height 1.6 (160%) — WCAG recomenda ≥ 1.5 para corpo de texto
               letter-spacing 0.015em — melhora legibilidade em blocos justificados */}
          <div
            className="text-gray-700"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "1.6",
              letterSpacing: "0.015em",
              textAlign: "justify",
            }}
          >
            {highlight && (
              <p className="font-semibold text-[#216F48] text-lg lg:text-[22px] mb-6">
                {highlight}
              </p>
            )}
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
