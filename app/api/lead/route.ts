import { NextResponse } from "next/server";
import { insertLead, type LeadInsert } from "@/lib/supabase";
import { sendMetaLeadEvent } from "@/lib/meta-capi";
import { notifyTelegram } from "@/lib/telegram";
import type { UtmParams } from "@/lib/utm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REQUIRED_FULL = ["nombre", "whatsapp", "ingresos"] as const;
const REQUIRED_QUICK = ["nombre", "whatsapp"] as const;

interface Body {
  nombre?: string;
  whatsapp?: string;
  ingresos?: string;
  email?: string;
  ocupacion?: string;
  objetivo?: string;
  source?: string;
  formType?: "full" | "quick";
  utm?: UtmParams;
  eventId?: string;
  website?: string;
}

function clean(value: unknown, max = 600): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed || null;
}

function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  return request.headers.get("x-real-ip");
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

  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const formType = body.formType === "quick" ? "quick" : "full";
  const required = formType === "quick" ? REQUIRED_QUICK : REQUIRED_FULL;

  for (const field of required) {
    if (!clean(body[field])) {
      return NextResponse.json(
        { ok: false, error: `Falta el campo "${field}"` },
        { status: 422 }
      );
    }
  }

  const ingresos =
    clean(body.ingresos) ?? (formType === "quick" ? "pending" : null);

  if (!ingresos) {
    return NextResponse.json(
      { ok: false, error: 'Falta el campo "ingresos"' },
      { status: 422 }
    );
  }

  const utm = body.utm && typeof body.utm === "object" ? body.utm : {};
  const utmJson = Object.keys(utm).length ? JSON.stringify(utm).slice(0, 600) : null;

  const lead: LeadInsert = {
    nombre: clean(body.nombre)!,
    whatsapp: clean(body.whatsapp)!,
    ingresos,
    email: clean(body.email),
    ocupacion: clean(body.ocupacion, 200),
    objetivo: utmJson ?? clean(body.objetivo, 1200),
    source: clean(body.source, 240),
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

  const eventId = clean(body.eventId, 80) ?? `lead-${Date.now()}`;

  try {
    await notifyTelegram({
      nombre: lead.nombre,
      whatsapp: lead.whatsapp,
      ingresos: lead.ingresos,
      email: lead.email,
      ocupacion: lead.ocupacion,
      objetivo: utmJson ? null : clean(body.objetivo, 1200),
      source: lead.source,
      formType,
    });
  } catch (err) {
    console.error("[api/lead] notifyTelegram failed:", err);
  }

  try {
    await sendMetaLeadEvent({
      eventId,
      eventSourceUrl: lead.referer,
      clientIp: clientIp(request),
      userAgent: lead.user_agent,
      nombre: lead.nombre,
      whatsapp: lead.whatsapp,
    });
  } catch (err) {
    console.error("[api/lead] sendMetaLeadEvent failed:", err);
  }

  return NextResponse.json({
    ok: true,
    saved: Boolean(saved),
    persistence_warning: saveError,
    eventId,
  });
}
