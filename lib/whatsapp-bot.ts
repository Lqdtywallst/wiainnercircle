// ─── Railway WhatsApp bot (optional outbound after lead) ─────────────────────

const BOT_URL = process.env.WHATSAPP_BOT_URL?.trim().replace(/\/$/, "");
const BOT_SECRET = process.env.WHATSAPP_BOT_SECRET?.trim();

export interface WhatsAppLeadPayload {
  nombre: string;
  whatsapp: string;
  formType?: "full" | "quick";
  source?: string | null;
}

export function isWhatsAppBotConfigured(): boolean {
  return Boolean(BOT_URL && BOT_SECRET);
}

/** Fire-and-forget — never blocks the lead response to the user. */
export async function notifyWhatsAppBot(
  payload: WhatsAppLeadPayload
): Promise<void> {
  if (!BOT_URL || !BOT_SECRET) {
    return;
  }

  const res = await fetch(`${BOT_URL}/send-lead-msg`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BOT_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`WhatsApp bot ${res.status}: ${detail}`);
  }
}
