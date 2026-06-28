import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ─── Server-side Supabase client ──────────────────────────────────────────────
// Uses the SERVICE_ROLE key so we can insert leads regardless of RLS.
// NEVER import this from a client component.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;
  if (cached) return cached;

  cached = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

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

export async function insertLead(lead: LeadInsert) {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error(
      "Supabase no está configurado. Falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  const { data, error } = await supabase
    .from("leads")
    .insert([lead])
    .select()
    .single();

  if (error) throw error;
  return data;
}
