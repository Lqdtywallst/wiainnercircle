"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CHECKOUT, PRICING } from "@/lib/constants";
import { fetchCheckoutStatus, startCheckout } from "@/lib/checkout-client";
import type { CheckoutPlan } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { track } from "@/lib/tracking";

function StripeMark() {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-60"
    >
      <path
        d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 12l2 2 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Checkout() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<CheckoutPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCheckoutStatus()
      .then(({ configured: ok }) => setConfigured(ok))
      .catch(() => setConfigured(false));
  }, []);

  async function handleCheckout(plan: CheckoutPlan) {
    setError(null);
    setLoadingPlan(plan);
    track("ClickCTA", { source: "checkout", plan });

    try {
      const result = await startCheckout(plan);
      if (!result.ok && !result.url) {
        setError(result.error ?? "No se pudo iniciar el pago");
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoadingPlan(null);
    }
  }

  const plans = [CHECKOUT.plans.monthly, CHECKOUT.plans.annual] as const;

  return (
    <section
      id="comprar"
      ref={ref}
      aria-label="Comprar acceso"
      className="bg-[#050505] section-pad border-t border-white/[0.06]
                 max-md:section-pad-sm"
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[980px] mx-auto"
      >
        <div className="text-center mb-12 max-sm:mb-10">
          <motion.p variants={fadeUp()} className="label mb-7">
            {CHECKOUT.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp()}
            className="font-bebas text-[clamp(44px,5vw,80px)] leading-[0.9]
                       tracking-[0.03em] text-white mb-5
                       max-sm:text-[clamp(40px,13vw,58px)]"
          >
            {CHECKOUT.title}
          </motion.h2>
          <motion.p
            variants={fadeUp()}
            className="font-inter text-[14px] font-light text-white/45 leading-[1.75]"
          >
            {CHECKOUT.subtitle}
          </motion.p>
        </div>

        {configured === false && (
          <motion.p
            variants={fadeUp()}
            role="status"
            className="font-inter text-[13px] text-white/50 text-center max-w-[560px] mx-auto
                       mb-10 border border-white/[0.08] rounded-[14px] px-6 py-5 leading-[1.7]"
          >
            {CHECKOUT.fallback}
          </motion.p>
        )}

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1 max-md:gap-5">
          {plans.map((plan) => {
            const isAnnual = plan.id === "annual";
            const isLoading = loadingPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                variants={fadeUp()}
                className={`checkout-plan relative flex flex-col rounded-[20px] border p-8
                           max-sm:p-6 ${
                             isAnnual
                               ? "border-lime/35 bg-lime/[0.04]"
                               : "border-white/[0.08] bg-white/[0.015]"
                           }`}
              >
                {"badge" in plan && plan.badge ? (
                  <span
                    className="absolute top-5 right-5 font-inter text-[9px] font-semibold
                               tracking-[0.2em] uppercase text-[#050505] bg-lime px-2.5 py-1 rounded-full"
                  >
                    {plan.badge}
                  </span>
                ) : null}

                <p className="font-inter text-[10px] tracking-[0.28em] uppercase text-white/35 mb-4">
                  {plan.name}
                </p>
                <p className="font-bebas text-[clamp(36px,5vw,52px)] text-lime leading-none mb-2">
                  {plan.price}
                </p>
                <p className="font-inter text-[13px] font-light text-white/50 mb-8 leading-[1.6]">
                  {plan.detail}
                </p>

                <button
                  type="button"
                  className={`mt-auto w-full ${
                    isAnnual ? "btn-lime" : "btn-ghost justify-center"
                  } disabled:opacity-50 disabled:cursor-wait`}
                  disabled={
                    configured !== true || loadingPlan !== null
                  }
                  onClick={() => handleCheckout(plan.id)}
                >
                  {isLoading ? "Redirigiendo a Stripe…" : plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={fadeUp()}
          className="mt-8 flex flex-col items-center gap-4 text-center"
        >
          <p className="inline-flex items-center gap-2 font-inter text-[11px] text-white/30 tracking-[0.06em]">
            <StripeMark />
            {CHECKOUT.stripeBadge}
          </p>

          {error && (
            <p
              role="alert"
              className="font-inter text-[12px] text-red-300 border border-red-300/30
                         rounded-md py-2 px-4 max-w-[520px]"
            >
              {error}
            </p>
          )}

          <a
            href="#acceso"
            className="micro-cta"
            onClick={() => track("ClickCTA", { source: "checkout-apply-alt" })}
          >
            {CHECKOUT.applyAlt}
          </a>

          <p className="font-inter text-[10px] text-white/22 tracking-[0.08em]">
            {PRICING.monthlyLabel} · {PRICING.annualLabel} ({PRICING.annualNote})
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
