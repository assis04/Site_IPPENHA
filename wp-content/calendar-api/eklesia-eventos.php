<?php
/**
 * Proxy da API Eklesia — WordPress.
 *
 * Usa wp_remote_get / wp_remote_post do WordPress para as requisições.
 * Inclui fallback: se a API falhar, retorna apenas os eventos recorrentes fixos.
 *
 * Caminho: /wp-content/calendar-api/eklesia-eventos.php
 *
 * Endpoints:
 *   GET  eklesia-eventos.php              → lista de eventos (FullCalendar)
 *   GET  eklesia-eventos.php?codEvento=N  → detalhes de um evento
 */

// Carrega o WordPress para usar wp_remote_get / wp_remote_post
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Responde preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── Token de integração Eklesia ──
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21lVXN1YXJpbyI6IiIsIkJhbmNvIjoiRUszMDM4IiwiTmFtZUlkZW50aWZpZXIiOiIzMSIsIlNpZCI6ImMyZDQ0Njc2LTliMjEtNGY1MC05MmFmLWFlZTNlMjIyOGFlZiIsIlBlcm1pc3NvZXMiOiItMjAwMCwtNTAwMCIsIm5iZiI6MTc3MDgzNDY3MCwiZXhwIjoyMDg2MzY3NTMwLCJpc3MiOiJ3ZWJBcGkiLCJhdWQiOiJ3ZWJBcGkifQ.ZpR4Fo06zc4qubKISLtvKTJJPQxmZ4jiqPPv5l79PoQ";

$eklesia_base = "https://gestaoweb.eklesiaonline.com.br/webapi/api";

// ── Eventos recorrentes fixos (fallback e programação semanal) ──
$recurringEvents = [
    [
        'title'      => 'Culto Dominical (Manhã)',
        'daysOfWeek' => [0],
        'startTime'  => '09:00:00',
        'endTime'    => '10:30:00',
    ],
    [
        'title'      => 'Culto Hispano',
        'daysOfWeek' => [0],
        'startTime'  => '11:00:00',
        'endTime'    => '12:30:00',
    ],
    [
        'title'      => 'Culto Dominical (Noite)',
        'daysOfWeek' => [0],
        'startTime'  => '18:00:00',
        'endTime'    => '19:30:00',
    ],
    [
        'title'      => 'Conexão com Deus',
        'daysOfWeek' => [1],
        'startTime'  => '20:00:00',
        'endTime'    => '21:30:00',
    ],
    [
        'title'      => 'Tarde da Esperança',
        'daysOfWeek' => [3],
        'startTime'  => '14:30:00',
        'endTime'    => '16:00:00',
    ],
    [
        'title'      => 'ETEP',
        'daysOfWeek' => [4],
        'startTime'  => '20:00:00',
        'endTime'    => '21:30:00',
    ],
];

// ── Tenta autenticar e buscar eventos da API ──
$fc_events = [];
$api_ok = false;

try {
    // ── Autentica e obtém access token ──
    $response_token = wp_remote_get(
        "$eklesia_base/Token/Autorizar?manterLogado=true",
        [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Accept'        => 'application/json',
            ],
            'timeout' => 15,
        ]
    );

    $access_token = '';
    if (is_wp_error($response_token)) {
        error_log('[Eklesia][Auth] WP Error: ' . $response_token->get_error_message());
    } else {
        $auth_status = wp_remote_retrieve_response_code($response_token);
        $auth_body   = wp_remote_retrieve_body($response_token);
        error_log("[Eklesia][Auth] Status: $auth_status | Body: $auth_body");

        if ($auth_status === 200) {
            $json_token = json_decode($auth_body, true);
            $access_token = $json_token['token'] ?? '';
        }
    }

    if (!empty($access_token)) {
        $default_headers = [
            'Authorization'          => 'Bearer ' . $access_token,
            'Accept'                 => 'application/json',
            'Eks-Igreja-Selecionada' => 1,
        ];

        // ── Detalhes de um evento específico ──
        if (isset($_GET['codEvento']) && intval($_GET['codEvento'])) {
            $codEvento = intval($_GET['codEvento']);
            $result = wp_remote_get(
                "$eklesia_base/eventos/EventoDivulgacao/Obter?codEvento=$codEvento",
                ['headers' => $default_headers, 'timeout' => 15]
            );

            if (!is_wp_error($result) && wp_remote_retrieve_body($result)) {
                echo wp_remote_retrieve_body($result);
            } else {
                echo json_encode(['error' => 'Sem resposta da API.']);
            }
            exit;
        }

        // ── Lista todos os eventos ativos ──
        $response_ativos = wp_remote_get(
            "$eklesia_base/eventos/Evento/ObterTodosAtivos",
            ['headers' => $default_headers, 'timeout' => 15]
        );
        $ativos = [];
        if (is_wp_error($response_ativos)) {
            error_log('[Eklesia][Ativos] WP Error: ' . $response_ativos->get_error_message());
        } else {
            $ativos_status = wp_remote_retrieve_response_code($response_ativos);
            $ativos_body   = wp_remote_retrieve_body($response_ativos);
            error_log("[Eklesia][Ativos] Status: $ativos_status | Body length: " . strlen($ativos_body));
            $ativos = json_decode($ativos_body, true);
        }

        $codEventos = [];
        if (is_array($ativos)) {
            foreach ($ativos as $evento) {
                if (!empty($evento['codigo'])) {
                    $codEventos[] = $evento['codigo'];
                }
            }
        }

        // ── Busca compromissos no intervalo de ±1 ano ──
        $dataInicial = date('Y-m-d', strtotime('-1 year'));
        $dataFinal   = date('Y-m-d', strtotime('+1 year'));

        $response_eventos = wp_remote_post(
            "$eklesia_base/eventos/EventoAgenda/ObterCompromissos",
            [
                'headers' => [
                    'Authorization'          => 'Bearer ' . $access_token,
                    'Content-Type'           => 'application/json; charset=utf-8',
                    'Accept'                 => '*/*',
                    'Eks-Igreja-Selecionada' => 1,
                ],
                'body'    => json_encode([
                    'dataInicial' => $dataInicial,
                    'dataFinal'   => $dataFinal,
                    'codEventos'  => $codEventos,
                ]),
                'method'  => 'POST',
                'timeout' => 20,
            ]
        );

        $eventos = [];
        if (is_wp_error($response_eventos)) {
            error_log('[Eklesia][Compromissos] WP Error: ' . $response_eventos->get_error_message());
        } else {
            $comp_status = wp_remote_retrieve_response_code($response_eventos);
            $comp_body   = wp_remote_retrieve_body($response_eventos);
            error_log("[Eklesia][Compromissos] Status: $comp_status | Body length: " . strlen($comp_body));
            $eventos = json_decode($comp_body, true);
        }

        // ── Monta array para o FullCalendar ──
        if (is_array($eventos)) {
            foreach ($eventos as $evento) {
                $allDay = false;
                if (
                    isset($evento['inicio'], $evento['fim']) &&
                    substr($evento['inicio'], 11) === '00:00:00' &&
                    substr($evento['fim'], 11) === '00:00:00'
                ) {
                    $allDay = true;
                }

                $fc_events[] = [
                    'title'  => $evento['assunto'] ?? 'Evento',
                    'start'  => $evento['inicio'] ?? '',
                    'end'    => $evento['fim'] ?? '',
                    'allDay' => $allDay,
                    'url'    => $evento['link'] ?? null,
                    'codigo' => $evento['codEvento'] ?? $evento['codigo'] ?? null,
                ];
            }
            $api_ok = true;
        }
    }
} catch (Exception $e) {
    // API falhou — segue para o fallback
    error_log('[Eklesia] Fallback ativado: ' . $e->getMessage());
}

if (!$api_ok) {
    error_log('[Eklesia] API indisponível — retornando apenas eventos recorrentes.');
}

// Sempre inclui os eventos recorrentes (junto com os da API, se houver)
$fc_events = array_merge($fc_events, $recurringEvents);

echo json_encode($fc_events);
