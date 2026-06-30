// ─── Client-side lead submission ──────────────────────────────────────────────

import {
  buildSourceLabel,
  captureUtmFromUrl,
  loadStoredUtm,
  type UtmParams,
} from "@/lib/utm";

export type LeadFormType = "full" | "quick";

export interface LeadSubmitInput {
  nombre: string;
  whatsapp: string;
  ingresos?: string;
  formType?: LeadFormType;
  honeypot?: string;
  eventId?: string;
}

export interface LeadSubmitResult {
  ok: boolean;
  error?: string;
}

function getUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  return { ...loadStoredUtm(), ...captureUtmFromUrl() };
}

export async function submitLead(input: LeadSubmitInput): Promise<LeadSubmitResult> {
  const utm = getUtm();
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const formType = input.formType ?? "full";

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: input.nombre,
        whatsapp: input.whatsapp,
        ingresos: input.ingresos,
        formType,
        source: buildSourceLabel(formType, pathname, utm),
        utm,
        website: input.honeypot ?? "",
        eventId: input.eventId,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        ok: false,
        error: data?.error || "Error al enviar la solicitud",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "No pudimos enviar tu solicitud. Inténtalo de nuevo en unos segundos.",
    };
  }
}

export function createLeadEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
