import { config } from "./config.js";

const GRAPH = "https://graph.facebook.com/v21.0";

export function normalizeWhatsAppTo(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) {
    throw new Error("Número de WhatsApp inválido");
  }
  return digits;
}

export function firstName(nombre: string): string {
  return nombre.trim().split(/\s+/)[0] || nombre.trim();
}

interface GraphResponse {
  messages?: Array<{ id: string }>;
  error?: { message?: string; code?: number };
}

async function graphPost(
  path: string,
  body: Record<string, unknown>
): Promise<GraphResponse> {
  const res = await fetch(`${GRAPH}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.whatsappToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as GraphResponse;

  if (!res.ok) {
    const msg = data.error?.message || res.statusText;
    throw new Error(`WhatsApp API ${res.status}: ${msg}`);
  }

  return data;
}

/** Business-initiated message after form submit — requires approved template. */
export async function sendLeadTemplateMessage(input: {
  nombre: string;
  whatsapp: string;
}): Promise<{ messageId: string }> {
  const to = normalizeWhatsAppTo(input.whatsapp);
  const name = firstName(input.nombre);
  const calendly = config.calendlyUrl || `${config.siteUrl}/gracias`;

  const parameters = [
    { type: "text", text: name },
    { type: "text", text: calendly },
  ];

  const data = await graphPost(`${config.phoneNumberId}/messages`, {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: config.templateName,
      language: { code: config.templateLang },
      components: [
        {
          type: "body",
          parameters,
        },
      ],
    },
  });

  const messageId = data.messages?.[0]?.id;
  if (!messageId) throw new Error("WhatsApp API: no message id returned");
  return { messageId };
}

/** Session message — only works within 24h after user wrote first. */
export async function sendTextMessage(input: {
  to: string;
  text: string;
}): Promise<{ messageId: string }> {
  const to = normalizeWhatsAppTo(input.to);

  const data = await graphPost(`${config.phoneNumberId}/messages`, {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { preview_url: true, body: input.text },
  });

  const messageId = data.messages?.[0]?.id;
  if (!messageId) throw new Error("WhatsApp API: no message id returned");
  return { messageId };
}

export function buildInboundAutoReply(): string {
  return [
    "Hola, gracias por escribir a WIA Inner Circle.",
    "",
    `Si aún no has aplicado: ${config.siteUrl}#contacto-rapido`,
    "",
    "Si ya aplicaste, te respondemos en minutos en horario Dubai (GMT+4).",
  ].join("\n");
}
