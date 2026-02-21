<?php
/**
 * Proxy da API do Instagram Graph — WordPress.
 *
 * O token e user ID ficam no servidor (wp-config.php), nunca no cliente.
 *
 * wp-config.php deve conter:
 *   define('INSTAGRAM_USER_ID', 'seu_user_id');
 *   define('INSTAGRAM_ACCESS_TOKEN', 'seu_token');
 *
 * Endpoint:
 *   GET instagram-feed.php → retorna últimos posts do feed
 */

require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$user_id = defined('INSTAGRAM_USER_ID') ? INSTAGRAM_USER_ID : '';
$token   = defined('INSTAGRAM_ACCESS_TOKEN') ? INSTAGRAM_ACCESS_TOKEN : '';

if (empty($user_id) || empty($token)) {
    http_response_code(500);
    echo json_encode(['error' => 'Credenciais do Instagram não configuradas no servidor.']);
    exit;
}

$limit = isset($_GET['limit']) ? min(max(intval($_GET['limit']), 1), 50) : 12;

$url = sprintf(
    'https://graph.instagram.com/%s/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=%s&limit=%d',
    urlencode($user_id),
    urlencode($token),
    $limit
);

$response = wp_remote_get($url, ['timeout' => 15]);

if (is_wp_error($response)) {
    error_log('[Instagram] WP Error: ' . $response->get_error_message());
    http_response_code(502);
    echo json_encode(['error' => 'Falha ao conectar com a API do Instagram.']);
    exit;
}

$status = wp_remote_retrieve_response_code($response);
$body   = wp_remote_retrieve_body($response);

if ($status === 429) {
    http_response_code(429);
    echo json_encode(['error' => 'Rate limit atingido. Tente novamente em alguns minutos.']);
    exit;
}

if ($status !== 200) {
    error_log("[Instagram] Status: $status | Body: $body");
    http_response_code(502);
    echo json_encode(['error' => 'Erro na API do Instagram.']);
    exit;
}

echo $body;
