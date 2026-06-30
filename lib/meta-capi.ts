// ─── Meta Conversions API (server-side Lead event) ────────────────────────────
// Optional — only fires when META_CAPI_ACCESS_TOKEN + pixel id are configured.

import { createHash } from "crypto";

const PIXEL_ID =
  process.env.META_PIXEL_ID?.trim() ||
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN?.trim();

export interface MetaLeadEventInput {
  eventId: string;
  eventSourceUrl?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
  nombre?: string | null;
  whatsapp?: string | null;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 ? digits : null;
}

function firstName(raw: string): string | null {
  const name = raw.trim().split(/\s+/)[0]?.toLowerCase();
  return name && name.length >= 2 ? name : null;
}

export function isMetaCapiConfigured(): boolean {
  return Boolean(PIXEL_ID && ACCESS_TOKEN);
}

export async function sendMetaLeadEvent(input: MetaLeadEventInput): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  const userData: Record<string, string | string[]> = {};

  const phone = input.whatsapp ? normalizePhone(input.whatsapp) : null;
  if (phone) userData.ph = sha256(phone);

  const fn = input.nombre ? firstName(input.nombre) : null;
  if (fn) userData.fn = sha256(fn);

  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.userAgent) userData.client_user_agent = input.userAgent;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.eventSourceUrl || undefined,
        user_data: userData,
      },
    ],
  };

  const url = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Meta CAPI error ${res.status}: ${detail}`);
  }
}
