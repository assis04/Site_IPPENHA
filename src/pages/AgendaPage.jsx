import { useState, useCallback, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { fetchEvents, fetchEventDetails } from "../services/eklesiaApi";
import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import "../styles/agenda.css";

/* ─── Paleta de cores para eventos ─── */
const EKLESIA_COLORS = [
  "#dda35c", "#a9c0f5", "#c1abc4", "#83d6d3", "#bcf0ee",
  "#9ae9c4", "#beecbb", "#ddd96e", "#e97f7f", "#ffe5ea",
  "#65df81", "#8cad9e", "#f5c7a9", "#c0b2a8", "#ffe5ea",
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getColorForEvent(title) {
  return EKLESIA_COLORS[hashString(title) % EKLESIA_COLORS.length];
}

function getContrastColor(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#222" : "#fff";
}

/* ─── Helpers de formatação ─── */
const pad = (n) => String(n).padStart(2, "0");
const formatDate = (d) =>
  `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const formatHour = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

function formatTimeRange(start, end, allDay) {
  if (allDay) return `Dia todo (${formatDate(start)})`;
  if (start && end) {
    if (formatDate(start) === formatDate(end)) {
      return `${formatDate(start)} ${formatHour(start)} até ${formatHour(end)}`;
    }
    return `${formatDate(start)} ${formatHour(start)} até ${formatDate(end)} ${formatHour(end)}`;
  }
  if (start) return `${formatDate(start)} ${formatHour(start)}`;
  return "";
}

function isValidLink(link) {
  if (!link) return false;
  return /^(https?:\/\/|\/\/|\/)/i.test(String(link).trim());
}

/* ─── Componente principal ─── */
export default function AgendaPage() {
  const [modal, setModal] = useState(null); // { title, time, loading, details, error }
  const modalRef = useRef(null);

  // Fecha modal com Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && modal) closeModal();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal]);

  // Foco no modal quando abre
  useEffect(() => {
    if (modal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [modal]);

  /* Busca eventos e aplica cores */
  const loadEvents = useCallback(async (_info, successCallback, failureCallback) => {
    try {
      const events = await fetchEvents();
      const colored = events.map((ev) => {
        const color = getColorForEvent(ev.title || "evento");
        return {
          ...ev,
          backgroundColor: color,
          borderColor: color,
          textColor: getContrastColor(color),
        };
      });
      successCallback(colored);
    } catch (err) {
      failureCallback(err);
    }
  }, []);

  /* Clique em evento → abre modal */
  const handleEventClick = useCallback(async (info) => {
    info.jsEvent.preventDefault();
    const { title, start, end, allDay, extendedProps } = info.event;
    const time = formatTimeRange(start, end, allDay);
    const codigo = extendedProps.codigo;

    setModal({ title, time, loading: !!codigo, details: null, error: null });

    if (!codigo) {
      setModal((prev) => ({
        ...prev,
        loading: false,
        error: "Este evento não possui detalhes adicionais.",
      }));
      return;
    }

    try {
      const ev = await fetchEventDetails(codigo);
      setModal((prev) => ({ ...prev, loading: false, details: ev }));
    } catch {
      setModal((prev) => ({
        ...prev,
        loading: false,
        error: "Não foi possível carregar os detalhes do evento.",
      }));
    }
  }, []);

  /* Estilização individual do evento no calendário */
  const handleEventDidMount = useCallback((info) => {
    const color = info.event.backgroundColor || getColorForEvent(info.event.title);
    const textColor = info.event.textColor || getContrastColor(color);
    Object.assign(info.el.style, {
      background: color,
      borderColor: color,
      color: textColor,
      borderRadius: "5px",
      padding: "2px 6px",
    });
  }, []);

  function closeModal() {
    setModal(null);
  }

  return (
    <main className="w-full min-h-screen bg-[#F0F2E4]">
      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex items-center gap-3 sm:gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-[#0F715C] hover:text-[#0a5a48] font-medium transition-colors text-sm sm:text-base"
        >
          <ArrowLeft size={18} weight="bold" className="sm:w-5 sm:h-5" />
          Voltar
        </Link>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 font-[Poppins,sans-serif]">
          Agenda
        </h1>
      </div>

      {/* Calendário */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-12 sm:pb-16">
        <div className="calendar-container bg-white rounded-2xl shadow-sm p-3 sm:p-6">
          <FullCalendar
            plugins={[dayGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            locale={ptBrLocale}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,listWeek,dayGridDay",
            }}
            buttonText={{
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
            }}
            height="auto"
            dayMaxEvents={3}
            events={loadEvents}
            eventClick={handleEventClick}
            eventDidMount={handleEventDidMount}
          />
        </div>
      </div>

      {/* Modal de detalhes do evento */}
      {modal && (
        <div
          className="fc-modal-bg fc-modal-bg--active"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
        >
          <div
            className="fc-modal-content fc-modal-content--active"
            ref={modalRef}
            tabIndex={-1}
          >
            <button
              className="fc-modal-close"
              onClick={closeModal}
              aria-label="Fechar modal"
            >
              &times;
            </button>

            <div id="event-modal-title" className="fc-modal-title">
              {modal.title}
            </div>
            <div className="fc-modal-time">{modal.time}</div>

            {/* Conteúdo extra */}
            <div className="fc-modal-extra">
              {modal.loading && (
                <p className="text-center text-[#04A37E]">Carregando informações...</p>
              )}

              {modal.error && (
                <p className="text-center text-gray-500">{modal.error}</p>
              )}

              {modal.details && <EventDetails details={modal.details} />}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ─── Sub-componente: detalhes do evento no modal ─── */
function EventDetails({ details }) {
  const ev = details;

  // Monta endereço
  const enderecoParts = [ev.endereco, ev.numero].filter(Boolean).join(", ");
  const bairro = ev.bairro ? ` - ${ev.bairro}` : "";
  const cidade = ev.cidade ? ` - ${ev.cidade}` : "";
  const uf = ev.uf ? ` - ${ev.uf}` : "";
  const cep = ev.cep ? ` - CEP: ${ev.cep}` : "";
  const enderecoFull = (enderecoParts + cep + bairro + cidade + uf).trim();

  // Link de inscrição
  const rawLink =
    ev.linkPaginaWeb || ev.link || ev.url || ev.linkPortal || ev.linkGestao || null;
  let linkToUse = null;
  if (isValidLink(rawLink)) {
    linkToUse = /^\/\//.test(rawLink) ? `https:${rawLink}` : rawLink;
  }

  return (
    <>
      {ev.arquivo?.url && (
        <img
          src={`https://assets.eklesiaonline.com.br/${ev.arquivo.url}`}
          alt="Imagem do evento"
          className="fc-modal-img"
        />
      )}

      {enderecoFull && (
        <div className="fc-modal-section">
          <b>Endereço:</b> {enderecoFull}
        </div>
      )}

      {ev.informacoesDivulgacao && (
        <div
          className="fc-modal-section"
          dangerouslySetInnerHTML={{ __html: ev.informacoesDivulgacao }}
        />
      )}

      {linkToUse && (
        <div className="mt-4 text-center">
          <a
            href={linkToUse}
            target="_blank"
            rel="noopener noreferrer"
            className="fc-modal-btn"
          >
            Inscreva-se
          </a>
        </div>
      )}
    </>
  );
}
