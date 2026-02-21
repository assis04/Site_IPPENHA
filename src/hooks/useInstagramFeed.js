import { useState, useEffect, useCallback, useRef } from "react";
import { isSafeUrl } from "../utils/safeUrl";

const CACHE_TTL_MS = 10 * 60 * 1000;
const PROXY_URL = "/wp-content/instagram-api/instagram-feed.php";

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
 * @returns {{ posts: array, loading: boolean, error: string | null, displayedCount: number, setDisplayedCount: function, retry: function }}
 */
export function useInstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [retryKey, setRetryKey] = useState(0);
  const abortRef = useRef(null);

  const retry = useCallback(() => {
    clearInstagramFeedCache();
    setError(null);
    setLoading(true);
    setRetryKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const cached = getCached();
    if (cached) {
      setPosts(cached);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    fetch(`${PROXY_URL}?limit=12`, { signal: controller.signal })
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
  }, [retryKey]);

  return {
    posts,
    loading,
    error,
    displayedCount,
    setDisplayedCount,
    retry,
  };
}
