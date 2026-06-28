// ─── Server-side Supabase access (REST, no SDK) ───────────────────────────────
// We talk to Supabase via its PostgREST endpoint with plain fetch instead of
// @supabase/supabase-js. The SDK pulls in a realtime/WebSocket dependency that
// crashes on some serverless Node runtimes ("Node.js 20 detected without native
// WebSocket support"). Using fetch keeps the function lean and reliable.
// Uses the SERVICE_ROLE key so we can insert leads regardless of RLS.
// NEVER import this from a client component.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export interface LeadInsert {
  nombre: string;
  whatsapp: string;
  ingresos: string;
  email: string | null;
  ocupacion: string | null;
  objetivo: string | null;
  source: string | null;
  user_agent: string | null;
  referer: string | null;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

export async function insertLead(lead: LeadInsert) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Supabase no está configurado. Falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  const endpoint = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/leads`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify([lead]),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Supabase REST error ${res.status}: ${detail}`);
  }

  const rows = (await res.json().catch(() => [])) as unknown[];
  return Array.isArray(rows) ? rows[0] ?? null : rows;
}
