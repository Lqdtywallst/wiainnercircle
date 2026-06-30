"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_js_1 = require("./config.js");
const send_lead_js_1 = require("./routes/send-lead.js");
const webhook_js_1 = require("./routes/webhook.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.json({
        ok: true,
        service: "wia-whatsapp-bot",
        configured: (0, config_js_1.isWhatsAppConfigured)(),
    });
});
app.get("/health", (_req, res) => {
    res.json({ ok: true, configured: (0, config_js_1.isWhatsAppConfigured)() });
});
app.use("/webhook", webhook_js_1.webhookRouter);
app.use("/send-lead-msg", send_lead_js_1.sendLeadRouter);
app.listen(config_js_1.config.port, "0.0.0.0", () => {
    console.info(`[wia-whatsapp-bot] listening on :${config_js_1.config.port}`);
    if (!(0, config_js_1.isWhatsAppConfigured)()) {
        console.warn("[wia-whatsapp-bot] WHATSAPP_TOKEN / PHONE_NUMBER_ID / INTERNAL_SECRET not fully set");
    }
});
