import { NextResponse } from "next/server";
import { insertLead, type LeadInsert } from "@/lib/supabase";
import { notifyTelegram } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REQUIRED = ["nombre", "whatsapp", "ingresos"] as const;

interface Body {
  nombre?: string;
  whatsapp?: string;
  ingresos?: string;
  email?: string;
  ocupacion?: string;
  objetivo?: string;
  source?: string;
  // Honeypot field — must stay empty
  website?: string;
}

function clean(value: unknown, max = 600): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed || null;
}

export async function GET() {
  return NextResponse.json({ ok: true, status: "lead-api-ready" });
}

export async function POST(request: Request) {
  try {
    return await handleLead(request);
  } catch (err) {
    console.error("[api/lead] unhandled:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

async function handleLead(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: if a bot fills the hidden "website" field, silently succeed.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  for (const field of REQUIRED) {
    if (!clean(body[field])) {
      return NextResponse.json(
        { ok: false, error: `Falta el campo "${field}"` },
        { status: 422 }
      );
    }
  }

  const lead: LeadInsert = {
    nombre: clean(body.nombre)!,
    whatsapp: clean(body.whatsapp)!,
    ingresos: clean(body.ingresos)!,
    email: clean(body.email),
    ocupacion: clean(body.ocupacion, 200),
    objetivo: clean(body.objetivo, 1200),
    source: clean(body.source, 120),
    user_agent: clean(request.headers.get("user-agent") ?? "", 400),
    referer: clean(request.headers.get("referer") ?? "", 400),
  };

  let saved: unknown = null;
  let saveError: string | null = null;

  try {
    saved = await insertLead(lead);
  } catch (err) {
    saveError = err instanceof Error ? err.message : "Unknown error";
    console.error("[api/lead] insertLead failed:", err);
  }

  // We fire notification regardless of DB success — we never want to lose a lead.
  try {
    await notifyTelegram({
      nombre: lead.nombre,
      whatsapp: lead.whatsapp,
      ingresos: lead.ingresos,
      email: lead.email,
      ocupacion: lead.ocupacion,
      objetivo: lead.objetivo,
      source: lead.source,
    });
  } catch (err) {
    console.error("[api/lead] notifyTelegram failed:", err);
  }

  // If DB failed but we logged & notified, still return ok so the user moves to /gracias.
  // The lead lives in the Telegram message + server logs.
  return NextResponse.json({
    ok: true,
    saved: Boolean(saved),
    persistence_warning: saveError,
  });
}
