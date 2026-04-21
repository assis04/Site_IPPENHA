<?php
/**
 * POST JSON — persiste preferência de cookies (LGPD).
 * Corpo: { "consent": "essential"|"all", "confirm_email": "" }
 * Honeypot: confirm_email deve estar vazio.
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
    // Resposta genérica — não revelar honeypot a crawlers.
    http_response_code(400);
    echo json_encode(['error' => 'bad_request']);
    exit;
}

$consent = isset($data['consent']) ? (string) $data['consent'] : '';
if (!ippenha_consent_valid_choice($consent)) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid_consent']);
    exit;
}

global $wpdb;
$table = ippenha_consent_table_name();

$now = ippenha_consent_now();
$existing = isset($_COOKIE[IPPENHA_CONSENT_COOKIE])
    ? (string) $_COOKIE[IPPENHA_CONSENT_COOKIE]
    : '';

if (ippenha_consent_valid_token($existing)) {
    $exists = (int) $wpdb->get_var(
        $wpdb->prepare(
            "SELECT COUNT(*) FROM `{$table}` WHERE consent_token = %s",
            $existing
        )
    );
    if ($exists > 0) {
        $updated = $wpdb->update(
            $table,
            [
                'consent_value' => $consent,
                'updated_at'    => $now,
            ],
            ['consent_token' => $existing],
            ['%s', '%s'],
            ['%s']
        );
        if ($updated === false) {
            error_log('[ippenha_consent] update failed: ' . $wpdb->last_error);
            http_response_code(500);
            echo json_encode(['error' => 'server_error']);
            exit;
        }
        echo json_encode(['ok' => true, 'consent' => $consent]);
        exit;
    }
}

$newToken = bin2hex(random_bytes(32));

$inserted = $wpdb->insert(
    $table,
    [
        'consent_token'  => $newToken,
        'consent_value'  => $consent,
        'created_at'     => $now,
        'updated_at'     => $now,
    ],
    ['%s', '%s', '%s', '%s']
);

if ($inserted === false) {
    error_log('[ippenha_consent] insert failed: ' . $wpdb->last_error);
    http_response_code(500);
    echo json_encode(['error' => 'server_error']);
    exit;
}

ippenha_consent_set_token_cookie($newToken);

echo json_encode(['ok' => true, 'consent' => $consent]);
