"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRouter = void 0;
const express_1 = require("express");
const config_js_1 = require("../config.js");
const whatsapp_js_1 = require("../whatsapp.js");
exports.webhookRouter = (0, express_1.Router)();
/** Meta webhook verification */
exports.webhookRouter.get("/", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (mode === "subscribe" && token === config_js_1.config.verifyToken && challenge) {
        console.info("[webhook] verified");
        res.status(200).send(String(challenge));
        return;
    }
    res.status(403).send("Forbidden");
});
/** Incoming WhatsApp messages from Meta */
exports.webhookRouter.post("/", async (req, res) => {
    res.sendStatus(200);
    try {
        if (!config_js_1.config.whatsappToken || !config_js_1.config.phoneNumberId)
            return;
        const entry = req.body?.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messages = value?.messages;
        if (!Array.isArray(messages) || messages.length === 0)
            return;
        for (const message of messages) {
            if (message.type !== "text")
                continue;
            const from = message.from;
            if (!from)
                continue;
            const text = (0, whatsapp_js_1.buildInboundAutoReply)();
            await (0, whatsapp_js_1.sendTextMessage)({ to: from, text });
            console.info("[webhook] auto-reply sent", { from });
        }
    }
    catch (err) {
        console.error("[webhook] inbound error:", err);
    }
});
exports.webhookRouter.get("/health", (_req, res) => {
    res.json({
        ok: true,
        webhook: Boolean(config_js_1.config.verifyToken),
        whatsapp: Boolean(config_js_1.config.whatsappToken && config_js_1.config.phoneNumberId),
    });
});
