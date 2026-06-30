import { RESPONSE_SLA, THANK_YOU, whatsappFirstContactMessage } from "@/lib/constants";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const INCOME_LABELS: Record<string, string> = {
  pending: "Por confirmar (captura rápida)",
  "0-2k": "Menos de $2,000 / mes",
  "2k-5k": "$2,000 – $5,000 / mes",
  "5k-10k": "$5,000 – $10,000 / mes",
  "10k-25k": "$10,000 – $25,000 / mes",
  "25k+": "Más de $25,000 / mes",
};

export interface LeadNotificationPayload {
  nombre: string;
  whatsapp: string;
  ingresos: string;
  email?: string | null;
  ocupacion?: string | null;
  objetivo?: string | null;
  source?: string | null;
  formType?: "full" | "quick";
}

function escapeMarkdown(value: string): string {
  return value.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

function incomeLabel(value: string): string {
  return INCOME_LABELS[value] ?? value;
}

function buildMessage(lead: LeadNotificationPayload): string {
  const phone = lead.whatsapp.replace(/[^\d+]/g, "");
  const waNumber = phone.replace(/^\+/, "");
  const replyMessage = encodeURIComponent(
    whatsappFirstContactMessage(lead.nombre, THANK_YOU.calendarUrl)
  );
  const waLink = `https://wa.me/${waNumber}?text=${replyMessage}`;

  const lines = [
    lead.formType === "quick"
      ? "⚡ *LEAD RÁPIDO · WIA Inner Circle*"
      : "🔥 *NUEVO LEAD · WIA Inner Circle*",
    "",
    `⏱ _${escapeMarkdown(RESPONSE_SLA.telegramHint)}_`,
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
