import { useState, useEffect, useCallback, useRef } from "react";
import { isSafeUrl } from "../utils/safeUrl";

const CACHE_TTL_MS = 10 * 60 * 1000;
const INSTAGRAM_FEED_PATH = "/wp-content/instagram-api/instagram-feed.php";

/** Posts pedidos à API (máximo visível no site). */
export const INSTAGRAM_FEED_FETCH_LIMIT = 27;
/** Grid inicial e incremento do "Ver mais". */
export const INSTAGRAM_PAGE_SIZE = 9;
/** Teto de posts mostrados no site; depois mostra-se o link para o Instagram. */
export const INSTAGRAM_MAX_VISIBLE = 27;

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
 * Hook que carrega o feed do Instagram via proxy PHP (token fica no servidor).
 *
 * @param {{ enabled?: boolean }} options — se enabled for false, não busca dados (LGPD / cookies).
 * @returns {{ posts: array, loading: boolean, error: string | null, displayedCount: number, setDisplayedCount: function, retry: function }}
 */
export function useInstagramFeed(options = {}) {
  const { enabled = true } = options;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(INSTAGRAM_PAGE_SIZE);
  const [retryKey, setRetryKey] = useState(0);
  const abortRef = useRef(null);

  const retry = useCallback(() => {
    clearInstagramFeedCache();
    setError(null);
    setLoading(true);
    setRetryKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setPosts([]);
      setLoading(false);
      setError(null);
      return undefined;
    }

    const cached = getCached();
    if (cached) {
      setPosts(cached);
      setDisplayedCount(Math.min(INSTAGRAM_PAGE_SIZE, cached.length));
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    fetch(`${INSTAGRAM_FEED_PATH}?limit=${INSTAGRAM_FEED_FETCH_LIMIT}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (response.status === 429) {
          throw { isRateLimit: true };
        }
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
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
        setDisplayedCount(Math.min(INSTAGRAM_PAGE_SIZE, sanitized.length));
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        if (err?.isRateLimit) {
          setError("Muitas requisições. Aguarde alguns minutos e tente novamente.");
          return;
        }
        setError(MESSAGE_FALLBACK);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [retryKey, enabled]);

  return {
    posts,
    loading,
    error,
    displayedCount,
    setDisplayedCount,
    retry,
  };
}
