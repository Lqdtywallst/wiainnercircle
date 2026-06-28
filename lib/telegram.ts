// ─── Telegram notifier ────────────────────────────────────────────────────────
// Sends a formatted message to a Telegram chat when a new lead arrives.
// Setup:
//   1. Talk to @BotFather, /newbot → save the bot token
//   2. Send /start to your bot
//   3. Visit https://api.telegram.org/bot<TOKEN>/getUpdates → copy "chat.id"
//   4. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local

import { INCOME_OPTIONS } from "@/lib/constants";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export interface LeadNotificationPayload {
  nombre: string;
  whatsapp: string;
  ingresos: string;
  email?: string | null;
  ocupacion?: string | null;
  objetivo?: string | null;
  source?: string | null;
}

function escapeMarkdown(value: string): string {
  return value.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

function incomeLabel(value: string): string {
  return INCOME_OPTIONS.find((opt) => opt.value === value)?.label ?? value;
}

function buildMessage(lead: LeadNotificationPayload): string {
  const phone = lead.whatsapp.replace(/[^\d+]/g, "");
  const waNumber = phone.replace(/^\+/, "");
  const replyMessage = encodeURIComponent(
    `Hola ${lead.nombre.split(" ")[0]}, soy Santiago de WIA Inner Circle. He recibido tu solicitud, ¿tienes 5 minutos para hablar?`
  );
  const waLink = `https://wa.me/${waNumber}?text=${replyMessage}`;

  const lines = [
    "🔥 *NUEVO LEAD · WIA Inner Circle*",
    "",
    `*Nombre:* ${escapeMarkdown(lead.nombre)}`,
    `*WhatsApp:* ${escapeMarkdown(lead.whatsapp)}`,
    `*Ingresos:* ${escapeMarkdown(incomeLabel(lead.ingresos))}`,
  ];

  if (lead.email) lines.push(`*Email:* ${escapeMarkdown(lead.email)}`);
  if (lead.ocupacion) lines.push(`*Ocupación:* ${escapeMarkdown(lead.ocupacion)}`);
  if (lead.objetivo) {
    lines.push("");
    lines.push("*Objetivo:*");
    lines.push(`_${escapeMarkdown(lead.objetivo)}_`);
  }
  if (lead.source) {
    lines.push("");
    lines.push(`📍 *Fuente:* ${escapeMarkdown(lead.source)}`);
  }

  lines.push("");
  lines.push(`👉 [Responder por WhatsApp](${waLink})`);

  return lines.join("\n");
}

export async function notifyTelegram(lead: LeadNotificationPayload): Promise<void> {
  if (!TOKEN || !CHAT_ID) {
    console.warn(
      "[telegram] notificación saltada — falta TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID"
    );
    return;
  }

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  const body = {
    chat_id: CHAT_ID,
    text: buildMessage(lead),
    parse_mode: "MarkdownV2",
    disable_web_page_preview: true,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Telegram API error ${res.status}: ${detail}`);
  }
}
