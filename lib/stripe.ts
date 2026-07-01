import Stripe from "stripe";
import type { CheckoutPlan } from "@/lib/constants";

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY?.trim() &&
      process.env.STRIPE_PRICE_MONTHLY?.trim() &&
      process.env.STRIPE_PRICE_ANNUAL?.trim()
  );
}

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;

  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY no configurada");
  }

  stripeClient = new Stripe(key);
  return stripeClient;
}

export function priceIdForPlan(plan: CheckoutPlan): string {
  const id =
    plan === "annual"
      ? process.env.STRIPE_PRICE_ANNUAL?.trim()
      : process.env.STRIPE_PRICE_MONTHLY?.trim();

  if (!id) {
    throw new Error(`Stripe price ID missing for plan: ${plan}`);
  }

  if (id.startsWith("prod_")) {
    throw new Error(
      `Variable STRIPE_PRICE_${plan === "annual" ? "ANNUAL" : "MONTHLY"} usa un Product ID (${id}). En Vercel debes poner el Price ID (empieza por price_), no prod_.`
    );
  }

  if (!id.startsWith("price_")) {
    throw new Error(
      `STRIPE_PRICE_${plan === "annual" ? "ANNUAL" : "MONTHLY"} debe empezar por price_. Valor actual: ${id}`
    );
  }

  return id;
}
