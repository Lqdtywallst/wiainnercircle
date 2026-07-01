import type { CheckoutPlan } from "@/lib/constants";

export interface CheckoutResponse {
  ok: boolean;
  url?: string;
  error?: string;
  configured?: boolean;
}

export async function fetchCheckoutStatus(): Promise<{ configured: boolean }> {
  const res = await fetch("/api/checkout", { method: "GET" });
  const data = (await res.json().catch(() => ({}))) as CheckoutResponse;
  return { configured: Boolean(data.configured) };
}

export async function startCheckout(plan: CheckoutPlan): Promise<CheckoutResponse> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });

  const data = (await res.json().catch(() => ({}))) as CheckoutResponse;

  if (data.ok && data.url) {
    window.location.href = data.url;
  }

  return data;
}
