# API de Consentimento (LGPD)

Persiste a preferência de cookies no **MySQL** (via WordPress `$wpdb`) e associa um **cookie HttpOnly** opaco ao navegador — sem armazenar nome, e-mail ou IP na tabela.

## Arquitetura

```
consent-api/
├── consent-bootstrap.php   # Bootstrap compartilhado (WP, CORS, rate limit, cookies, validação)
├── save-consent.php        # POST — grava/atualiza consentimento
├── reset-consent.php       # POST — revoga consentimento (apaga registro + cookie)
├── status.php              # GET  — consulta consentimento atual pelo cookie
├── schema.sql              # DDL da tabela MySQL
└── README.md
```

## Instalação

1. Crie a tabela executando `schema.sql` no MySQL (ajuste o prefixo `wpxi_` conforme seu `$wpdb->prefix`).

2. Garanta que o deploy copia esta pasta para `public_html/wp-content/consent-api/` (já previsto no `.cpanel.yml`).

## Endpoints

| Método | Ficheiro | Descrição |
|--------|----------|-----------|
| `GET` | `status.php` | Retorna `{ "consent": null \| "essential" \| "all" }` |
| `POST` | `save-consent.php` | Corpo: `{ "consent": "essential" \| "all", "confirm_email": "" }` |
| `POST` | `reset-consent.php` | Corpo: `{ "confirm_email": "" }` |

O campo **`confirm_email`** é um honeypot anti-bot: deve estar sempre vazio. Se preenchido, a requisição é rejeitada com `400 bad_request` sem revelar o motivo.

### Respostas comuns

| HTTP | Corpo | Significado |
|------|-------|-------------|
| `200` | `{ "ok": true, "consent": "..." }` | Sucesso |
| `400` | `{ "error": "bad_request" }` | JSON inválido, honeypot preenchido ou consent inválido |
| `405` | `{ "error": "method_not_allowed" }` | Método HTTP incorreto |
| `413` | `{ "error": "payload_too_large" }` | Corpo excede 4 KB |
| `429` | `{ "error": "rate_limited" }` | Limite de requisições por IP excedido |
| `500` | `{ "error": "server_error" }` | Falha na gravação (detalhes no `error_log`) |

## Segurança

| Camada | Detalhe |
|--------|---------|
| SQL Injection | Todas as queries usam `$wpdb->prepare` / `$wpdb->insert` / `$wpdb->update` / `$wpdb->delete` |
| Tamanho do corpo | Limitado a 4096 bytes (`IPPENHA_CONSENT_MAX_BODY`) |
| Rate limit | 40 requisições / 10 min por IP via transients WordPress |
| Cookie | `HttpOnly`, `SameSite=Lax`, `Secure` em HTTPS, expiração 400 dias |
| Token | 64 caracteres hexadecimais gerados com `random_bytes(32)` |
| Honeypot | Campo `confirm_email` deve estar vazio — rejeita bots que preenchem tudo |
| CORS | Whitelist de origens; `Access-Control-Allow-Credentials: true` apenas para origem válida |
| Timezone | Timestamps (`created_at`, `updated_at`) gravados em `America/Sao_Paulo` via `ippenha_consent_now()` |

## Fluxo

1. **Primeiro acesso** — frontend chama `GET status.php` → responde `{ "consent": null }` (sem cookie).
2. **Usuário clica "Aceitar todos" ou "Recusar"** — frontend envia `POST save-consent.php` com o valor.
   - Backend gera token (`random_bytes`), grava na tabela e define o cookie HttpOnly.
3. **Visitas subsequentes** — `GET status.php` lê o cookie, busca na tabela e retorna o consentimento salvo.
4. **Alteração** — novo `POST save-consent.php` atualiza o registro existente (mesmo token).
5. **Revogação** — `POST reset-consent.php` apaga o registro e limpa o cookie → banner reaparece.

## Tabela MySQL

```sql
CREATE TABLE IF NOT EXISTS `wpxi_ippenha_lgpd_consent` (
  `consent_token` char(64) NOT NULL,
  `consent_value` varchar(16) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`consent_token`),
  KEY `idx_updated` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

> Ajuste o prefixo `wpxi_` para o valor de `$wpdb->prefix` do seu WordPress.

## Manutenção

A tabela cresce uma linha por visitante que interage com o banner. Recomenda-se **limpeza periódica** de registros com `updated_at` superior a 400 dias (mesmo tempo de expiração do cookie):

```sql
DELETE FROM wpxi_ippenha_lgpd_consent
WHERE updated_at < DATE_SUB(NOW(), INTERVAL 400 DAY);
```

Pode ser executado via cron do WordPress (`wp_schedule_event`) ou manualmente pelo phpMyAdmin a cada 6 meses.

## Requisitos

- WordPress com `wp-load.php` na raiz do `DOCUMENT_ROOT`.
- PHP 8.0+ (`DateTimeImmutable`, `random_bytes`, `strict_types`).
- MySQL/MariaDB com charset `utf8mb4`.
