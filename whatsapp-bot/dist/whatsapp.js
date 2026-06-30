"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeWhatsAppTo = normalizeWhatsAppTo;
exports.firstName = firstName;
exports.sendLeadTemplateMessage = sendLeadTemplateMessage;
exports.sendTextMessage = sendTextMessage;
exports.buildInboundAutoReply = buildInboundAutoReply;
const config_js_1 = require("./config.js");
const GRAPH = "https://graph.facebook.com/v21.0";
function normalizeWhatsAppTo(phone) {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8) {
        throw new Error("Número de WhatsApp inválido");
    }
    return digits;
}
function firstName(nombre) {
    return nombre.trim().split(/\s+/)[0] || nombre.trim();
}
async function graphPost(path, body) {
    const res = await fetch(`${GRAPH}/${path}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${config_js_1.config.whatsappToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({})));
    if (!res.ok) {
        const msg = data.error?.message || res.statusText;
        throw new Error(`WhatsApp API ${res.status}: ${msg}`);
    }
    return data;
}
/** Business-initiated message after form submit — requires approved template. */
async function sendLeadTemplateMessage(input) {
    const to = normalizeWhatsAppTo(input.whatsapp);
    const name = firstName(input.nombre);
    const calendly = config_js_1.config.calendlyUrl || `${config_js_1.config.siteUrl}/gracias`;
    const parameters = [
        { type: "text", text: name },
        { type: "text", text: calendly },
    ];
    const data = await graphPost(`${config_js_1.config.phoneNumberId}/messages`, {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
            name: config_js_1.config.templateName,
            language: { code: config_js_1.config.templateLang },
            components: [
                {
                    type: "body",
                    parameters,
                },
            ],
        },
    });
    const messageId = data.messages?.[0]?.id;
    if (!messageId)
        throw new Error("WhatsApp API: no message id returned");
    return { messageId };
}
/** Session message — only works within 24h after user wrote first. */
async function sendTextMessage(input) {
    const to = normalizeWhatsAppTo(input.to);
    const data = await graphPost(`${config_js_1.config.phoneNumberId}/messages`, {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { preview_url: true, body: input.text },
    });
    const messageId = data.messages?.[0]?.id;
    if (!messageId)
        throw new Error("WhatsApp API: no message id returned");
    return { messageId };
}
function buildInboundAutoReply() {
    return [
        "Hola, gracias por escribir a WIA Inner Circle.",
        "",
        `Si aún no has aplicado: ${config_js_1.config.siteUrl}#contacto-rapido`,
        "",
        "Si ya aplicaste, te respondemos en minutos en horario Dubai (GMT+4).",
    ].join("\n");
}
