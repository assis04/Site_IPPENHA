<?php
/**
 * POST JSON — remove preferência (revoga / reabre banner).
 * Corpo: { "confirm_email": "" } (honeypot vazio).
 */

declare(strict_types=1);

require_once __DIR__ . '/consent-bootstrap.php';

ippenha_consent_handle_preflight();
ippenha_consent_json_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

if (!ippenha_consent_rate_limit_ok()) {
    http_response_code(429);
    echo json_encode(['error' => 'rate_limited']);
    exit;
}

$parsed = ippenha_consent_read_json_body();
if (!$parsed['ok']) {
    $code = ($parsed['error'] ?? '') === 'payload_too_large' ? 413 : 400;
    http_response_code($code);
    echo json_encode(['error' => $parsed['error'] ?? 'bad_request']);
    exit;
}

$data = $parsed['data'];

if (!ippenha_consent_honeypot_clean($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'bad_request']);
    exit;
}

global $wpdb;
$table = ippenha_consent_table_name();

$token = isset($_COOKIE[IPPENHA_CONSENT_COOKIE])
    ? (string) $_COOKIE[IPPENHA_CONSENT_COOKIE]
    : '';

if (ippenha_consent_valid_token($token)) {
    $wpdb->delete($table, ['consent_token' => $token], ['%s']);
}

ippenha_consent_clear_token_cookie();

echo json_encode(['ok' => true, 'consent' => null]);
