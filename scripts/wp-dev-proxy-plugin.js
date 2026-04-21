/**
 * Dev-only: pedidos a /wp-content/* são obtidos no Node com fetch(redirect: 'follow').
 * O browser só vê localhost:5173 — evita que siga 301 para outro host (CORS).
 */
/** @param {Headers} headers */
function stripUpstreamHeaders(headers) {
  const drop = new Set([
    "connection",
    "keep-alive",
    "transfer-encoding",
    "te",
    "trailer",
    "upgrade",
    "location",
    "server",
    "content-encoding",
    "content-length",
  ]);
  const o = {};
  headers.forEach((v, k) => {
    if (!drop.has(k.toLowerCase())) o[k] = v;
  });
  return o;
}

function normalizeWpTarget(raw, fallback) {
  if (!raw || typeof raw !== "string") return fallback;
  const t = raw.trim();
  if (!t) return fallback;
  try {
    new URL(t);
    return t;
  } catch {
    return fallback;
  }
}

function forwardClientHeaders(incoming) {
  const skip = new Set([
    "host",
    "connection",
    "keep-alive",
    "transfer-encoding",
    "te",
    "trailer",
    "upgrade",
    "content-length",
  ]);
  /** @type {Record<string, string>} */
  const out = {};
  for (const [k, v] of Object.entries(incoming)) {
    if (v === undefined || skip.has(k.toLowerCase())) continue;
    out[k] = Array.isArray(v) ? v.join(", ") : String(v);
  }
  return out;
}

async function readBodyBuffer(req) {
  const chunks = [];
  for await (const ch of req) chunks.push(ch);
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

const LOCAL_ORIGIN_RE = /^http:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i;

export function wpDevProxyPlugin(envViteWpTarget) {
  const fallback = "http://ippenha.local";
  const wpTargetRaw = normalizeWpTarget(envViteWpTarget, fallback);
  const base = new URL(wpTargetRaw.endsWith("/") ? wpTargetRaw : `${wpTargetRaw}/`);
  const allowedOrigin = String(base.origin);

  return {
    name: "ippenha-wp-dev-proxy",
    enforce: "pre",
    configureServer(server) {
      const useHttps = base.protocol === "https:";
      if (useHttps) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      }

      server.middlewares.use((req, res, next) => {
        const raw = req.url || "";
        if (!raw.startsWith("/wp-content")) {
          next();
          return;
        }

        const q = raw.indexOf("?");
        const pathOnly = q === -1 ? raw : raw.slice(0, q);
        const search = q === -1 ? "" : raw.slice(q);
        if (!pathOnly.startsWith("/wp-content/") || pathOnly.includes("..")) {
          res.statusCode = 403;
          res.end();
          return;
        }

        let dest;
        try {
          dest = new URL(pathOnly + search, base);
        } catch {
          res.statusCode = 400;
          res.end();
          return;
        }
        if (dest.origin !== allowedOrigin) {
          res.statusCode = 403;
          res.end();
          return;
        }

        void handleWpContent(req, res, dest, base.hostname).catch(() => {
          res.statusCode = 502;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end("Bad gateway (WordPress dev proxy)");
        });
      });
    },
  };
}

/**
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 * @param {URL} dest
 * @param {string} wpHost
 */
async function handleWpContent(req, res, dest, wpHost) {
  if (req.method === "OPTIONS") {
    const origin = req.headers.origin || "";
    res.statusCode = 204;
    if (LOCAL_ORIGIN_RE.test(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    res.setHeader("Access-Control-Max-Age", "86400");
    res.setHeader("Vary", "Origin");
    res.end();
    return;
  }

  const method = req.method || "GET";
  const headers = forwardClientHeaders(req.headers);
  headers.host = wpHost;

  let body;
  if (method !== "GET" && method !== "HEAD") {
    body = await readBodyBuffer(req);
  }

  const r = await fetch(dest.href, {
    method,
    headers,
    body: body && method !== "GET" && method !== "HEAD" ? body : undefined,
    redirect: "follow",
  });

  if (r.status >= 300 && r.status < 400) {
    throw new Error("redirect");
  }

  res.statusCode = r.status;
  res.setHeader("Cache-Control", "no-store");
  const outH = stripUpstreamHeaders(r.headers);
  Object.entries(outH).forEach(([k, v]) => {
    if (v !== undefined) res.setHeader(k, v);
  });

  const buf = await r.arrayBuffer();
  res.end(Buffer.from(buf));
}
