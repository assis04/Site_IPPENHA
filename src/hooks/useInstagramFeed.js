import { useState, useEffect, useCallback } from "react";
import { isSafeUrl } from "../utils/safeUrl";

/** TTL do cache em ms (padrão: 10 min). Reduz chamadas à API e ajuda a respeitar rate limit. */
const CACHE_TTL_MS = 10 * 60 * 1000;

/** Cache em memória (singleton) para o feed Instagram. */
const feedCache = { data: null, timestamp: 0 };

function getCached() {
  if (!feedCache.data) return null;
  if (Date.now() - feedCache.timestamp > CACHE_TTL_MS) {
    feedCache.data = null;
    return null;
  }
  return feedCache.data;
}

function setCached(posts) {
  feedCache.data = posts;
  feedCache.timestamp = Date.now();
}

export function clearInstagramFeedCache() {
  feedCache.data = null;
  feedCache.timestamp = 0;
}

function sanitizePosts(raw) {
  return raw
    .map((p) => {
      const mediaUrl = isSafeUrl(p.media_url) ? p.media_url : "";
      const thumbUrl = isSafeUrl(p.thumbnail_url) ? p.thumbnail_url : mediaUrl;
      return {
        ...p,
        permalink: isSafeUrl(p.permalink) ? p.permalink : "#",
        media_url: mediaUrl,
        thumbnail_url: thumbUrl,
      };
    })
    .filter((p) => p.media_url || p.thumbnail_url);
}

const MESSAGE_FALLBACK = "Falha ao carregar feed";

/**
 * Hook que carrega o feed do Instagram com cache (TTL) e tratamento de 429 (rate limit).
 *
 * @returns {{ posts: array, loading: boolean, error: string | null, displayedCount: number, setDisplayedCount: function, retry: function }}
 */
export function useInstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [retryKey, setRetryKey] = useState(0);

  const userId = import.meta.env.VITE_INSTAGRAM_USER_ID?.toString().trim();
  const token = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN?.toString().trim();

  const retry = useCallback(() => {
    clearInstagramFeedCache();
    setError(null);
    setLoading(true);
    setRetryKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!userId || !token) {
      setError("Variáveis de ambiente do Instagram não configuradas.");
      setLoading(false);
      return;
    }

    const cached = getCached();
    if (cached) {
      setPosts(cached);
      setLoading(false);
      return;
    }

    const url = `https://graph.instagram.com/${encodeURIComponent(userId)}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${encodeURIComponent(token)}&limit=12`;

    fetch(url)
      .then((response) => {
        if (response.status === 429) {
          throw { isRateLimit: true };
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setError(MESSAGE_FALLBACK);
          return;
        }
        const raw = data.data || [];
        const sanitized = sanitizePosts(raw);
        setCached(sanitized);
        setPosts(sanitized);
      })
      .catch((err) => {
        if (err?.isRateLimit) {
          setError("Muitas requisições. Aguarde alguns minutos e tente novamente.");
          return;
        }
        setError(MESSAGE_FALLBACK);
      })
      .finally(() => setLoading(false));
  }, [userId, token, retryKey]);

  return {
    posts,
    loading,
    error,
    displayedCount,
    setDisplayedCount,
    retry,
  };
}
