import express from "express";
import { config, isWhatsAppConfigured } from "./config.js";
import { sendLeadRouter } from "./routes/send-lead.js";
import { webhookRouter } from "./routes/webhook.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "wia-whatsapp-bot",
    configured: isWhatsAppConfigured(),
  });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, configured: isWhatsAppConfigured() });
});

app.use("/webhook", webhookRouter);
app.use("/send-lead-msg", sendLeadRouter);

app.listen(config.port, "0.0.0.0", () => {
  console.info(`[wia-whatsapp-bot] listening on :${config.port}`);
  if (!isWhatsAppConfigured()) {
    console.warn(
      "[wia-whatsapp-bot] WHATSAPP_TOKEN / PHONE_NUMBER_ID / INTERNAL_SECRET not fully set"
    );
  }
});
