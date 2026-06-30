import { Router } from "express";
import { assertWhatsAppSendReady } from "../config.js";
import { sendLeadTemplateMessage } from "../whatsapp.js";
import { requireInternalAuth } from "../auth.js";

export const sendLeadRouter = Router();

interface SendLeadBody {
  nombre?: string;
  whatsapp?: string;
  formType?: "full" | "quick";
  source?: string;
}

sendLeadRouter.post("/", requireInternalAuth, async (req, res) => {
  try {
    assertWhatsAppSendReady();

    const body = req.body as SendLeadBody;
    const nombre = body.nombre?.trim();
    const whatsapp = body.whatsapp?.trim();

    if (!nombre || !whatsapp) {
      res.status(422).json({ ok: false, error: "nombre and whatsapp required" });
      return;
    }

    const result = await sendLeadTemplateMessage({ nombre, whatsapp });

    console.info("[send-lead-msg]", {
      whatsapp,
      formType: body.formType || "full",
      source: body.source || null,
      messageId: result.messageId,
    });

    res.json({ ok: true, messageId: result.messageId });
  } catch (err) {
    console.error("[send-lead-msg] error:", err);
    res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : "Send failed",
    });
  }
});
