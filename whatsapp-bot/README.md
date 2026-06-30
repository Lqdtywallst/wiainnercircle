# WIA WhatsApp Bot (Railway)

Microservicio para **WhatsApp Cloud API** de WIA Inner Circle.

```
Vercel /api/lead  ──POST──▶  /send-lead-msg  ──▶  Meta WhatsApp API
Meta webhook      ──POST──▶  /webhook         ──▶  auto-respuesta entrante
```

## Endpoints

| Método | Ruta | Uso |
|--------|------|-----|
| GET | `/` | Health + status |
| GET | `/health` | Health check |
| GET | `/webhook` | Verificación Meta (hub.verify_token) |
| POST | `/webhook` | Mensajes entrantes de WhatsApp |
| POST | `/send-lead-msg` | Vercel dispara tras nuevo lead (Bearer auth) |

## Variables de entorno (Railway)

```env
PORT=8080
INTERNAL_SECRET=genera_un_secreto_largo_aleatorio

WHATSAPP_TOKEN=EAAxxxxx
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_VERIFY_TOKEN=otro_secreto_para_meta_webhook

WHATSAPP_TEMPLATE_NAME=wia_lead_confirmation
WHATSAPP_TEMPLATE_LANG=es

CALENDLY_URL=https://calendly.com/wiainvestments/30min
SITE_URL=https://www.wiainnercircle.com
```

## Plantilla Meta (obligatoria para `/send-lead-msg`)

Crea en **Meta Business → WhatsApp → Message templates**:

- **Nombre:** `wia_lead_confirmation`
- **Idioma:** Spanish
- **Categoría:** Utility
- **Cuerpo:**

```
Hola {{1}},

Soy Santiago de WIA Inner Circle. He recibido tu solicitud.

¿Tienes 5 minutos para una llamada rápida?

Reserva aquí: {{2}}
```

Variables: `{{1}}` = nombre, `{{2}}` = URL Calendly o /gracias.

## Desplegar en Railway

> **Importante:** en **Settings → Source → Root Directory** pon exactamente: `whatsapp-bot`
> Sin esto Railway intentará construir la web Next.js y fallará.

1. [railway.app](https://railway.app) → **New Project** → **GitHub Repository**
2. Selecciona este repo y configura **Root Directory:** `whatsapp-bot`
3. **Build command:** `npm install && npm run build`
4. **Start command:** `npm start`
5. Añade las variables de entorno arriba
6. **Settings → Networking → Generate Domain** (ej. `wia-whatsapp-bot-production.up.railway.app`)

## Conectar Meta webhook

En [developers.facebook.com](https://developers.facebook.com) → tu app → WhatsApp → Configuration:

- **Callback URL:** `https://TU-DOMINIO-RAILWAY/webhook`
- **Verify token:** mismo valor que `WHATSAPP_VERIFY_TOKEN`
- Suscríbete a: `messages`

## Conectar Vercel

En Vercel → Environment Variables:

```env
WHATSAPP_BOT_URL=https://TU-DOMINIO-RAILWAY
WHATSAPP_BOT_SECRET=mismo_valor_que_INTERNAL_SECRET
```

Tras un lead nuevo, `/api/lead` llamará a `POST /send-lead-msg` automáticamente.

## Desarrollo local

```bash
cd whatsapp-bot
cp .env.example .env   # rellena valores
npm install
npm run dev
```

Probar envío:

```bash
curl -X POST http://localhost:8080/send-lead-msg \
  -H "Authorization: Bearer TU_INTERNAL_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","whatsapp":"+34600000000","formType":"quick"}'
```

## Notas

- `/send-lead-msg` usa **plantilla aprobada** (mensaje business-initiated).
- `/webhook` responde con texto libre solo cuando el usuario escribió primero (ventana 24h).
- Si WhatsApp falla, Vercel igual devuelve éxito al usuario (no bloqueamos la conversión).
