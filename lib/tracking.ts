// ─── Lightweight event tracker ────────────────────────────────────────────────
// Fires events into Meta Pixel (fbq), GA4 (gtag) and TikTok Pixel (ttq) when
// available. Safe to call from any client component — falls back to noop.

type EventName =
  | "Lead"
  | "ClickWhatsApp"
  | "ClickTelegram"
  | "ClickCTA"
  | "FormStart"
  | "FormStep";

interface EventPayload {
  [key: string]: unknown;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, payload?: EventPayload) => void };
    dataLayer?: unknown[];
  }
}

export function track(event: EventName, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  try {
    window.fbq?.("track", event, payload);
  } catch {}

  try {
    window.gtag?.("event", event, payload);
  } catch {}

  try {
    window.ttq?.track(event, payload);
  } catch {}

  if (process.env.NODE_ENV !== "production") {
    console.info("[track]", event, payload);
  }
}
