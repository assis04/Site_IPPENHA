<?php
declare(strict_types=1);

/**
 * Bootstrap para proxies JSON públicos (calendário Eklesia, Instagram).
 * CORS por whitelist (alinhado ao consent-api); rate limit por IP via transients.
 */

if (!defined('ABSPATH')) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php';
}

const IPPENHA_PUBLIC_API_PROD_ORIGINS = [
    'https://ippenha.org.br',
    'https://www.ippenha.org.br',
    'https://ippenha.com.br',
    'https://www.ippenha.com.br',
];

const IPPENHA_PUBLIC_API_DEV_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:4173',
];

function ippenha_public_api_allowed_origins(): array
{
    $origins = IPPENHA_PUBLIC_API_PROD_ORIGINS;
    if (defined('WP_DEBUG') && WP_DEBUG) {
        $origins = array_merge($origins, IPPENHA_PUBLIC_API_DEV_ORIGINS);
    }
    return $origins;
}

function ippenha_public_api_resolve_origin(): ?string
{
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? (string) $_SERVER['HTTP_ORIGIN'] : '';
    if ($origin === '') {
        return null;
    }
    $origin = rtrim($origin, '/');
    return in_array($origin, ippenha_public_api_allowed_origins(), true) ? $origin : null;
}

function ippenha_public_api_json_headers(): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');

    $origin = ippenha_public_api_resolve_origin();
    if ($origin !== null) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Vary: Origin');
    }
}

/**
 * Preflight OPTIONS (sem credentials — APIs só GET).
 */
function ippenha_public_api_handle_preflight(string $allow_methods = 'GET, OPTIONS'): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
        return;
    }

    $origin = ippenha_public_api_resolve_origin();
    if ($origin !== null) {
        header("Access-Control-Allow-Origin: {$origin}");
        header("Access-Control-Allow-Methods: {$allow_methods}");
        header('Access-Control-Allow-Headers: Content-Type, Accept');
        header('Access-Control-Max-Age: 86400');
        header('Vary: Origin');
    }

    http_response_code(204);
    exit;
}

/** Rate limit por IP (escopo distinto por proxy). */
function ippenha_public_api_rate_limit_ok(string $scope, int $max, int $window_seconds): bool
{
    if (!function_exists('set_transient')) {
        return true;
    }
    $ip = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '0';
    $key = 'ippenha_proxy_rl_' . $scope . '_' . md5($ip);
    $n = (int) get_transient($key);
    if ($n >= $max) {
        return false;
    }
    set_transient($key, $n + 1, $window_seconds);
    return true;
}
