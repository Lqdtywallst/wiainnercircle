"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLeadRouter = void 0;
const express_1 = require("express");
const config_js_1 = require("../config.js");
const whatsapp_js_1 = require("../whatsapp.js");
const auth_js_1 = require("../auth.js");
exports.sendLeadRouter = (0, express_1.Router)();
exports.sendLeadRouter.post("/", auth_js_1.requireInternalAuth, async (req, res) => {
    try {
        (0, config_js_1.assertWhatsAppSendReady)();
        const body = req.body;
        const nombre = body.nombre?.trim();
        const whatsapp = body.whatsapp?.trim();
        if (!nombre || !whatsapp) {
            res.status(422).json({ ok: false, error: "nombre and whatsapp required" });
            return;
        }
        const result = await (0, whatsapp_js_1.sendLeadTemplateMessage)({ nombre, whatsapp });
        console.info("[send-lead-msg]", {
            whatsapp,
            formType: body.formType || "full",
            source: body.source || null,
            messageId: result.messageId,
        });
        res.json({ ok: true, messageId: result.messageId });
    }
    catch (err) {
        console.error("[send-lead-msg] error:", err);
        res.status(500).json({
            ok: false,
            error: err instanceof Error ? err.message : "Send failed",
        });
    }
});
