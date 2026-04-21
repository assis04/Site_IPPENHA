/**
 * Serviço de integração com a API Eklesia.
 * URL relativa: em dev o Vite (wp-dev-proxy-plugin) encaminha /wp-content para o WordPress local.
 */

const API_BASE =
  import.meta.env.VITE_EKLESIA_API_BASE ||
  "/wp-content/calendar-api/eklesia-eventos.php";

export async function fetchEvents() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error(`Erro ao carregar eventos (${res.status})`);
  return res.json();
}

export async function fetchEventDetails(codEvento) {
  const res = await fetch(`${API_BASE}?codEvento=${encodeURIComponent(codEvento)}`);
  if (!res.ok) throw new Error(`Erro ao carregar detalhes do evento (${res.status})`);
  return res.json();
}
