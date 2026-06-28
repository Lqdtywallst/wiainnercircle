# Setup · Captura de leads (Supabase + Telegram)

Esta guía te deja el formulario funcionando de punta a punta: guarda cada lead en Supabase y te manda una notificación instantánea por Telegram con un botón directo para responder por WhatsApp.

Tiempo estimado: **15 minutos**.

---

## 1. Supabase (base de datos)

### 1.1 Crear proyecto
1. Entra a [supabase.com](https://supabase.com) y crea cuenta (gratis).
2. **New project** → pon nombre (ej. `wia-leads`), elige región **Frankfurt** o **Singapore** (más cercana a Dubai), genera password fuerte.
3. Espera ~2 min a que se aprovisione.

### 1.2 Crear la tabla `leads`
En el dashboard del proyecto, ve a **SQL Editor → New query** y pega esto:

```sql
create table public.leads (
  id          bigserial primary key,
  created_at  timestamptz not null default now(),
  nombre      text not null,
  whatsapp    text not null,
  ingresos    text not null,
  email       text,
  ocupacion   text,
  objetivo    text,
  source      text,
  user_agent  text,
  referer     text,
  status      text not null default 'new'
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx     on public.leads (status);
```

Pulsa **Run**. Listo, ya tienes la tabla.

### 1.3 Copiar credenciales
Settings → **API**, copia:
- `Project URL` → será tu `SUPABASE_URL`
- `service_role` key (la secreta, NO la anon) → será `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ La `service_role` key tiene poderes de admin. Nunca la expongas en el navegador. Aquí la usamos solo desde la API route del servidor, así que es seguro.

---

## 2. Telegram (notificación instantánea en el móvil)

### 2.1 Crear el bot
1. Abre Telegram, busca `@BotFather` y abre el chat.
2. Envía `/newbot`.
3. Ponle un nombre (ej. `WIA Leads Bot`) y un username único acabado en `bot` (ej. `wia_leads_bot`).
4. BotFather te da un **token** del estilo `7654:ABC...xyz`. Cópialo → será `TELEGRAM_BOT_TOKEN`.

### 2.2 Obtener tu chat ID
1. Busca tu bot por el username y envíale `/start`.
2. Visita en el navegador (sustituye `<TOKEN>` por el token del paso anterior):
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
3. Busca el JSON que aparece. Verás algo como:
   ```json
   "chat":{"id":123456789,"first_name":"Santiago", ...}
   ```
4. Ese `id` numérico → será `TELEGRAM_CHAT_ID`.

> Si quieres recibirlo en un grupo en vez de en privado: añade el bot al grupo, manda un mensaje cualquiera, y el `id` en `getUpdates` será negativo (ej. `-1001234567890`).

---

## 3. Variables de entorno

### 3.1 Local
Copia `.env.local.example` a `.env.local` y rellena los 4 valores:

```bash
cp .env.local.example .env.local
```

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJI...
TELEGRAM_BOT_TOKEN=7654:ABC...xyz
TELEGRAM_CHAT_ID=123456789
```

Reinicia `npm run dev` para que las vea.

### 3.2 Producción (Vercel)
En tu proyecto de Vercel → **Settings → Environment Variables** → añade las 4 mismas variables (entorno *Production* y *Preview*).
Vuelve a desplegar.

---

## 4. Probar el flujo

1. Abre `http://localhost:3000` y rellena el formulario hasta el final (los 2 pasos).
2. Comprueba:
   - ✅ En Telegram debes recibir un mensaje instantáneo con todos los datos del lead y un botón `Responder por WhatsApp`.
   - ✅ En Supabase → **Table editor → leads** debe aparecer una nueva fila.
   - ✅ La web debe redirigirte a `/gracias`.

Si algo falla:
- Revisa la consola del navegador y la del servidor (`npm run dev`).
- El endpoint también acepta tests directos:
  ```bash
  curl -X POST http://localhost:3000/api/lead \
    -H "Content-Type: application/json" \
    -d '{"nombre":"Test","whatsapp":"+34600000000","ingresos":"10k-25k"}'
  ```

---

## 5. Gestionar leads

### En Supabase
- **Table editor → leads** → ver todos, ordenar por `created_at`, filtrar por `status`.
- Puedes editar el campo `status` a mano (`new`, `contacted`, `qualified`, `client`, `lost`) para llevar un mini-CRM sin más herramientas.

### Exportar a Sheets / Notion / HubSpot más adelante
Cuando quieras subir de nivel, Supabase tiene webhooks (Database → Webhooks) que pueden disparar a Zapier/Make/n8n cuando entra un lead nuevo y empujarlo donde quieras.

---

## 6. Qué pasa si Supabase o Telegram fallan

El endpoint está diseñado para **no perder leads nunca**:
- Si Supabase falla, igual notifica por Telegram + guarda el error en los logs del servidor.
- Si Telegram falla, igual guarda en Supabase.
- Si ambos fallan, el lead queda en los logs (Vercel → Logs) y la web devuelve éxito al usuario (no le penalizamos por nuestro fallo).

Lo importante: **revisa los logs cada cierto tiempo** los primeros días para confirmar que todo va fino.
