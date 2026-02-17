/**
 * Serviço de integração com a API Eklesia.
 *
 * URL: /wp-content/calendar-api/eklesia-eventos.php
 *
 * - Desenvolvimento: Vite proxy redireciona para `php -S localhost:8080`.
 * - Produção (HostGator): o Apache serve o PHP diretamente.
 */

const API_BASE =
  import.meta.env.VITE_EKLESIA_API_BASE ||
  "/wp-content/calendar-api/eklesia-eventos.php";

/**
 * Busca todos os eventos formatados para o FullCalendar.
 * @returns {Promise<Array>} Lista de eventos
 */
export async function fetchEvents() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error(`Erro ao carregar eventos (${res.status})`);
  return res.json();
}

/**
 * Busca detalhes de um evento específico pelo código.
 * @param {number|string} codEvento - Código do evento na API Eklesia
 * @returns {Promise<Object>} Detalhes do evento
 */
export async function fetchEventDetails(codEvento) {
  const res = await fetch(`${API_BASE}?codEvento=${codEvento}`);
  if (!res.ok) throw new Error(`Erro ao carregar detalhes do evento (${res.status})`);
  return res.json();
}
