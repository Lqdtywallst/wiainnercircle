"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.isWhatsAppConfigured = isWhatsAppConfigured;
exports.assertWhatsAppSendReady = assertWhatsAppSendReady;
exports.assertWebhookReady = assertWebhookReady;
function required(name) {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}
function optional(name, fallback = "") {
    return process.env[name]?.trim() || fallback;
}
exports.config = {
    port: Number(process.env.PORT || 8080),
    /** Shared secret — Vercel sends Authorization: Bearer <this> */
    internalSecret: optional("INTERNAL_SECRET"),
    whatsappToken: optional("WHATSAPP_TOKEN"),
    phoneNumberId: optional("WHATSAPP_PHONE_NUMBER_ID"),
    verifyToken: optional("WHATSAPP_VERIFY_TOKEN"),
    /** Approved Meta template for outbound lead confirmation */
    templateName: optional("WHATSAPP_TEMPLATE_NAME", "wia_lead_confirmation"),
    templateLang: optional("WHATSAPP_TEMPLATE_LANG", "es"),
    calendlyUrl: optional("CALENDLY_URL"),
    siteUrl: optional("SITE_URL", "https://www.wiainnercircle.com"),
};
function isWhatsAppConfigured() {
    return Boolean(exports.config.whatsappToken && exports.config.phoneNumberId && exports.config.internalSecret);
}
function assertWhatsAppSendReady() {
    required("WHATSAPP_TOKEN");
    required("WHATSAPP_PHONE_NUMBER_ID");
    required("INTERNAL_SECRET");
}
function assertWebhookReady() {
    required("WHATSAPP_VERIFY_TOKEN");
    required("WHATSAPP_TOKEN");
    required("WHATSAPP_PHONE_NUMBER_ID");
}
