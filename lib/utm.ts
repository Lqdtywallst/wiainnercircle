// ─── UTM / ad attribution (first-touch, sessionStorage) ───────────────────────

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "wia-utm-v1";

export function parseUtmFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const out: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) out[key] = value.slice(0, 200);
  }

  return out;
}

export function loadStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}

/** Persist first-touch UTMs for the session (call once on landing). */
export function captureUtmFromUrl(): UtmParams {
  if (typeof window === "undefined") return {};

  const incoming = parseUtmFromSearch(window.location.search);
  const stored = loadStoredUtm();
  const merged = { ...stored, ...incoming };

  if (Object.keys(incoming).length > 0) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      // sessionStorage blocked — still return merged for this page view
    }
  }

  return merged;
}

export function formatUtmLabel(utm: UtmParams): string | null {
  const parts: string[] = [];
  if (utm.utm_source) parts.push(utm.utm_source);
  if (utm.utm_medium) parts.push(utm.utm_medium);
  if (utm.utm_campaign) parts.push(utm.utm_campaign);
  if (utm.utm_content) parts.push(utm.utm_content);
  if (utm.utm_term) parts.push(utm.utm_term);
  if (utm.fbclid) parts.push("fb");
  if (utm.gclid) parts.push("google");
  return parts.length ? parts.join(" · ") : null;
}

export function buildSourceLabel(
  formType: string,
  pathname: string,
  utm: UtmParams
): string {
  const utmLabel = formatUtmLabel(utm);
  const base = `${formType} · ${pathname || "/"}`;
  return utmLabel ? `${base} · ${utmLabel}` : base;
}
