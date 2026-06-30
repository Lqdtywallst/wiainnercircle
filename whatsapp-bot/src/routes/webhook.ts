import { Router } from "express";
import { config } from "../config.js";
import { buildInboundAutoReply, sendTextMessage } from "../whatsapp.js";

export const webhookRouter = Router();

/** Meta webhook verification */
webhookRouter.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === config.verifyToken && challenge) {
    console.info("[webhook] verified");
    res.status(200).send(String(challenge));
    return;
  }

  res.status(403).send("Forbidden");
});

/** Incoming WhatsApp messages from Meta */
webhookRouter.post("/", async (req, res) => {
  res.sendStatus(200);

  try {
    if (!config.whatsappToken || !config.phoneNumberId) return;

    const entry = req.body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (!Array.isArray(messages) || messages.length === 0) return;

    for (const message of messages) {
      if (message.type !== "text") continue;

      const from = message.from as string | undefined;
      if (!from) continue;

      const text = buildInboundAutoReply();
      await sendTextMessage({ to: from, text });

      console.info("[webhook] auto-reply sent", { from });
    }
  } catch (err) {
    console.error("[webhook] inbound error:", err);
  }
});

webhookRouter.get("/health", (_req, res) => {
  res.json({
    ok: true,
    webhook: Boolean(config.verifyToken),
    whatsapp: Boolean(config.whatsappToken && config.phoneNumberId),
  });
});
