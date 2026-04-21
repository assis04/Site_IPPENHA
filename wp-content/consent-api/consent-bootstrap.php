<?php
declare(strict_types=1);

/**
 * Bootstrap compartilhado — LGPD / preferências de cookies.
 * Requer WordPress (wp-load.php) para $wpdb e utilitários.
 *
 * Dados armazenados: token opaco (64 hex) + valor do consentimento.
 * Não armazenamos nome, e-mail nem IP em tabela (minimização).
 */

if (!defined('ABSPATH')) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php';
}

/** Tamanho máximo do corpo JSON (bytes). */
const IPPENHA_CONSENT_MAX_BODY = 4096;

/** Máximo de gravações por IP a cada janela. */
const IPPENHA_CONSENT_RL_MAX = 40;
/** Janela de rate limit (segundos). */
const IPPENHA_CONSENT_RL_WINDOW = 600;

/** Nome do cookie HttpOnly (apenas identificador opaco). */
const IPPENHA_CONSENT_COOKIE = 'ippenha_lgpd_token';

/**
 * @return string Nome completo da tabela com prefixo WP.
 */
function ippenha_consent_table_name(): string
{
    global $wpdb;
    return $wpdb->prefix . 'ippenha_lgpd_consent';
}

/** Origens permitidas em produção. */
const IPPENHA_CONSENT_PROD_ORIGINS = [
    'https://ippenha.org.br',
    'https://www.ippenha.org.br',
    'https://ippenha.com.br',
    'https://www.ippenha.com.br',
];

function ippenha_consent_is_local_dev_origin(string $origin): bool
{
    return (bool) preg_match('#^http://(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$#', $origin);
}

function ippenha_consent_allowed_origins(): array
{
    return IPPENHA_CONSENT_PROD_ORIGINS;
}

/**
 * Valida a Origin do pedido e devolve a origem permitida (ou null).
 */
function ippenha_consent_resolve_origin(): ?string
{
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? (string) $_SERVER['HTTP_ORIGIN'] : '';
    if ($origin === '') {
        return null;
    }
    $origin = rtrim($origin, '/');
    if (in_array($origin, ippenha_consent_allowed_origins(), true)) {
        return $origin;
    }
    if (ippenha_consent_is_local_dev_origin($origin)) {
        return $origin;
    }
    return null;
}

/**
 * Emite headers JSON + CORS (origin específica + credentials).
 */
function ippenha_consent_json_headers(): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');

    $origin = ippenha_consent_resolve_origin();
    if ($origin !== null) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
    }
}

/**
 * Responde ao preflight OPTIONS e encerra (para POST com Content-Type: application/json).
 */
function ippenha_consent_handle_preflight(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
        return;
    }

    $origin = ippenha_consent_resolve_origin();
    if ($origin !== null) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Accept');
        header('Access-Control-Max-Age: 86400');
        header('Vary: Origin');
    }

    http_response_code(204);
    exit;
}

/**
 * Token: 64 caracteres hexadecimais (32 bytes).
 */
function ippenha_consent_valid_token(?string $t): bool
{
    return is_string($t)
        && strlen($t) === 64
        && ctype_xdigit($t);
}

function ippenha_consent_valid_choice(string $c): bool
{
    return $c === 'essential' || $c === 'all';
}

/**
 * Rate limit simples por IP (via transients do WordPress).
 */
function ippenha_consent_rate_limit_ok(): bool
{
    if (!function_exists('set_transient')) {
        return true;
    }
    $ip = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '0';
    $key = 'ippenha_consent_rl_' . md5($ip);
    $n = (int) get_transient($key);
    if ($n >= IPPENHA_CONSENT_RL_MAX) {
        return false;
    }
    set_transient($key, $n + 1, IPPENHA_CONSENT_RL_WINDOW);
    return true;
}

/**
 * Lê JSON do corpo com limite de tamanho (Content-Length + leitura truncada).
 *
 * @return array{ok:bool, data?:array, error?:string}
 */
function ippenha_consent_read_json_body(): array
{
    $cl = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
    if ($cl > IPPENHA_CONSENT_MAX_BODY) {
        return ['ok' => false, 'error' => 'payload_too_large'];
    }

    $raw = file_get_contents('php://input', false, null, 0, IPPENHA_CONSENT_MAX_BODY + 1);
    if ($raw === false || strlen($raw) > IPPENHA_CONSENT_MAX_BODY) {
        return ['ok' => false, 'error' => 'payload_too_large'];
    }

    $data = json_decode($raw, true);
    if (!is_array($data)) {
        return ['ok' => false, 'error' => 'invalid_json'];
    }

    return ['ok' => true, 'data' => $data];
}

/**
 * Honeypot: o cliente deve enviar o campo vazio; ausência = rejeitar (cliente legítimo envia "").
 */
function ippenha_consent_honeypot_clean(array $data): bool
{
    if (!array_key_exists('confirm_email', $data)) {
        return false;
    }
    $v = $data['confirm_email'];
    return $v === '' || $v === null;
}

/** Data/hora atual em America/Sao_Paulo (formato MySQL). */
function ippenha_consent_now(): string
{
    return (new DateTimeImmutable('now', new DateTimeZone('America/Sao_Paulo')))->format('Y-m-d H:i:s');
}

/**
 * @return array{expires:int, path:string, secure:bool, httponly:bool, samesite:string}
 */
function ippenha_consent_cookie_options(): array
{
    $secure = function_exists('is_ssl') && is_ssl();
    return [
        'expires'  => time() + (400 * DAY_IN_SECONDS),
        'path'     => '/',
        'secure'   => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ];
}

function ippenha_consent_set_token_cookie(string $token): void
{
    $opts = ippenha_consent_cookie_options();
    setcookie(IPPENHA_CONSENT_COOKIE, $token, $opts);
    $_COOKIE[IPPENHA_CONSENT_COOKIE] = $token;
}

function ippenha_consent_clear_token_cookie(): void
{
    $opts = ippenha_consent_cookie_options();
    $opts['expires'] = time() - 3600;
    setcookie(IPPENHA_CONSENT_COOKIE, '', $opts);
    unset($_COOKIE[IPPENHA_CONSENT_COOKIE]);
}
