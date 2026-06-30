// ─── Lightweight event tracker ────────────────────────────────────────────────
// Fires events into Meta Pixel (fbq), GA4 (gtag) and TikTok Pixel (ttq) when
// available. Safe to call from any client component — falls back to noop.

type EventName =
  | "Lead"
  | "ClickWhatsApp"
  | "ClickTelegram"
  | "ClickCTA"
  | "ClickNav"
  | "FormStart"
  | "FormStep"
  | "ExitIntent";

interface EventPayload {
  eventId?: string;
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

  const { eventId, ...rest } = payload;
  const fbOptions = eventId ? { eventID: eventId } : undefined;

  try {
    if (fbOptions) {
      window.fbq?.("track", event, rest, fbOptions);
    } else {
      window.fbq?.("track", event, rest);
    }
  } catch {}

  try {
    window.gtag?.("event", event, rest);
  } catch {}

  try {
    window.ttq?.track(event, rest);
  } catch {}

  if (process.env.NODE_ENV !== "production") {
    console.info("[track]", event, payload);
  }
}
