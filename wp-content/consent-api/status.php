<?php
/**
 * GET — retorna o consentimento associado ao cookie HttpOnly (se existir).
 */

declare(strict_types=1);

require_once __DIR__ . '/consent-bootstrap.php';

ippenha_consent_handle_preflight();
ippenha_consent_json_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

if (!ippenha_consent_rate_limit_ok()) {
    http_response_code(429);
    echo json_encode(['error' => 'rate_limited']);
    exit;
}

global $wpdb;
$table = ippenha_consent_table_name();

$token = isset($_COOKIE[IPPENHA_CONSENT_COOKIE])
    ? (string) $_COOKIE[IPPENHA_CONSENT_COOKIE]
    : '';

if (!ippenha_consent_valid_token($token)) {
    echo json_encode(['consent' => null]);
    exit;
}

$value = $wpdb->get_var(
    $wpdb->prepare(
        "SELECT consent_value FROM `{$table}` WHERE consent_token = %s LIMIT 1",
        $token
    )
);

if ($value !== 'essential' && $value !== 'all') {
    echo json_encode(['consent' => null]);
    exit;
}

echo json_encode(['consent' => $value]);
