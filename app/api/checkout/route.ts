import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";
import {
  getStripe,
  isStripeConfigured,
  priceIdForPlan,
} from "@/lib/stripe";
import type { CheckoutPlan } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isPlan(value: unknown): value is CheckoutPlan {
  return value === "monthly" || value === "annual";
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: isStripeConfigured(),
  });
}

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Checkout no disponible todavía. Configura Stripe en el servidor o aplica por el formulario.",
      },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { plan?: unknown };
    const plan = body.plan;

    if (!isPlan(plan)) {
      return NextResponse.json(
        { ok: false, error: "Plan inválido. Usa monthly o annual." },
        { status: 422 }
      );
    }

    const stripe = getStripe();
    const priceId = priceIdForPlan(plan);
    const baseUrl = SITE_URL.replace(/\/$/, "");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/gracias?tipo=checkout&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#comprar`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        plan,
        product: "wia-inner-circle",
      },
      subscription_data: {
        metadata: {
          plan,
          product: "wia-inner-circle",
        },
      },
    });

    if (!session.url) {
      throw new Error("Stripe no devolvió URL de checkout");
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    console.error("[api/checkout]", err);
    const message =
      err instanceof Error ? err.message : "Error al iniciar el pago";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
