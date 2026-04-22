<?php
declare(strict_types=1);

/**
 * Bootstrap centralizado — carrega WordPress e fornece utilitários
 * compartilhados entre TODAS as APIs do site (proxies públicos e consent).
 *
 * Responsabilidades:
 *   - Carregar wp-load.php (se ainda não carregado)
 *   - Whitelist de origens CORS (produção + dev)
 *   - Resolução e validação de Origin
 *   - Emissão de headers JSON + CORS (com/sem credentials)
 *   - Preflight OPTIONS (com/sem credentials)
 *   - Rate limit por IP via transients WordPress
 */

if (!defined('ABSPATH')) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php';
}

/* ================================================================
   Origens permitidas (Single Source of Truth)
   ================================================================ */

const IPPENHA_PROD_ORIGINS = [
    'https://ippenha.org.br',
    'https://www.ippenha.org.br',
    'https://ippenha.com.br',
    'https://www.ippenha.com.br',
];

/**
 * Vite / preview: apenas http em loopback (qualquer porta).
 */
function ippenha_is_local_dev_origin(string $origin): bool
{
    return (bool) preg_match('#^http://(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$#', $origin);
}

function ippenha_allowed_origins(): array
{
    return IPPENHA_PROD_ORIGINS;
}

/* ================================================================
   CORS — resolução de Origin
   ================================================================ */

/**
 * Valida o header Origin contra a whitelist.
 * @return string|null Origem validada ou null se ausente/não permitida.
 */
function ippenha_resolve_origin(): ?string
{
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? (string) $_SERVER['HTTP_ORIGIN'] : '';
    if ($origin === '') {
        return null;
    }
    $origin = rtrim($origin, '/');
    if (in_array($origin, ippenha_allowed_origins(), true)) {
        return $origin;
    }
    if (ippenha_is_local_dev_origin($origin)) {
        return $origin;
    }
    return null;
}

/* ================================================================
   Headers JSON + CORS
   ================================================================ */

/**
 * Emite Content-Type JSON, X-Content-Type-Options e CORS.
 * @param bool $credentials Se true, adiciona Access-Control-Allow-Credentials (para APIs com cookies).
 */
function ippenha_json_headers(bool $credentials = false): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');

    $origin = ippenha_resolve_origin();
    if ($origin !== null) {
        header("Access-Control-Allow-Origin: {$origin}");
        if ($credentials) {
            header('Access-Control-Allow-Credentials: true');
        }
        header('Vary: Origin');
    }
}

/* ================================================================
   Preflight OPTIONS
   ================================================================ */

/**
 * Responde ao preflight OPTIONS e encerra o script.
 * @param string $methods Métodos permitidos (ex: "GET, OPTIONS" ou "GET, POST, OPTIONS").
 * @param bool   $credentials Se true, adiciona Allow-Credentials.
 */
function ippenha_handle_preflight(string $methods = 'GET, OPTIONS', bool $credentials = false): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
        return;
    }

    $origin = ippenha_resolve_origin();
    if ($origin !== null) {
        header("Access-Control-Allow-Origin: {$origin}");
        if ($credentials) {
            header('Access-Control-Allow-Credentials: true');
        }
        header("Access-Control-Allow-Methods: {$methods}");
        header('Access-Control-Allow-Headers: Content-Type, Accept');
        header('Access-Control-Max-Age: 86400');
        header('Vary: Origin');
    }

    http_response_code(204);
    exit;
}

/* ================================================================
   Rate limit por IP (transients WordPress)
   ================================================================ */

/**
 * @param string $scope  Identificador único (ex: "consent", "instagram", "calendar").
 * @param int    $max    Máximo de requisições na janela.
 * @param int    $window Tamanho da janela em segundos.
 */
function ippenha_rate_limit_ok(string $scope, int $max, int $window): bool
{
    if (!function_exists('set_transient')) {
        return true;
    }
    $ip  = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '0';
    $key = 'ippenha_rl_' . $scope . '_' . md5($ip);
    $n   = (int) get_transient($key);
    if ($n >= $max) {
        return false;
    }
    set_transient($key, $n + 1, $window);
    return true;
}
