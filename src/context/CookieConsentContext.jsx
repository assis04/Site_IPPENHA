import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/** Fallback offline / falha de API (mesma chave que antes, para migração suave). */
const STORAGE_KEY = "ippenha_lgpd_cookie_consent";

const CONSENT_API = "/wp-content/consent-api";

/** Campo honeypot — deve ir sempre vazio no JSON (servidor rejeita se ausente ou preenchido). */
const HONEYPOT_PAYLOAD = { confirm_email: "" };

const CookieConsentContext = createContext(null);

function readLocalConsent() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "essential" || v === "all") return v;
  } catch {
    /* ignore */
  }
  return null;
}

function writeLocalConsent(value) {
  try {
    if (value === "essential" || value === "all") {
      localStorage.setItem(STORAGE_KEY, value);
    }
  } catch {
    /* ignore */
  }
}

function clearLocalConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

async function fetchServerConsent() {
  const res = await fetch(`${CONSENT_API}/status.php`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const c = data?.consent;
  return c === "essential" || c === "all" ? c : null;
}

export function CookieConsentProvider({ children }) {
  const [consent, setConsentState] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [isPersisting, setIsPersisting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const server = await fetchServerConsent();
        if (cancelled) return;
        if (server) {
          setConsentState(server);
          writeLocalConsent(server);
        } else {
          const local = readLocalConsent();
          if (!cancelled) setConsentState(local);
        }
      } catch {
        if (!cancelled) {
          setConsentState(readLocalConsent());
        }
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const setConsent = useCallback(async (value) => {
    if (value !== "essential" && value !== "all") return;
    setIsPersisting(true);
    try {
      try {
        const res = await fetch(`${CONSENT_API}/save-consent.php`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            consent: value,
            ...HONEYPOT_PAYLOAD,
          }),
        });
        if (res.ok) {
          setConsentState(value);
          writeLocalConsent(value);
          return;
        }
      } catch {
        /* rede / servidor indisponível */
      }
      setConsentState(value);
      writeLocalConsent(value);
    } finally {
      setIsPersisting(false);
    }
  }, []);

  const resetConsent = useCallback(async () => {
    setIsPersisting(true);
    try {
      try {
        await fetch(`${CONSENT_API}/reset-consent.php`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...HONEYPOT_PAYLOAD }),
        });
      } catch {
        /* ignore */
      }
      setConsentState(null);
      clearLocalConsent();
    } finally {
      setIsPersisting(false);
    }
  }, []);

  const allowThirdParty = consent === "all";

  const value = useMemo(
    () => ({
      consent,
      hydrated,
      isPersisting,
      setConsent,
      resetConsent,
      allowThirdParty,
    }),
    [consent, hydrated, isPersisting, setConsent, resetConsent, allowThirdParty]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
