"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PricingBlock from "@/components/PricingBlock";
import { CHECKOUT, PRICING } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="precio"
      ref={ref}
      aria-label="Inversión"
      className="bg-[#050505] section-pad max-md:section-pad-sm"
    >
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[860px] mx-auto text-center"
      >
        <motion.p variants={fadeUp()} className="label mb-7">
          {PRICING.sectionEyebrow}
        </motion.p>

        <motion.h2
          variants={fadeUp()}
          className="font-bebas text-[clamp(44px,5vw,80px)] leading-[0.9]
                     tracking-[0.03em] text-white mb-10
                     max-sm:text-[clamp(40px,13vw,58px)] max-sm:mb-8"
        >
          {PRICING.sectionTitle}
        </motion.h2>

        <motion.div variants={fadeUp()}>
          <PricingBlock variant="section" />
        </motion.div>

        <motion.div variants={fadeUp()} className="mt-10 max-sm:mt-8 flex flex-col items-center gap-4">
          <a
            href="#comprar"
            className="btn-lime"
            onClick={() => track("ClickCTA", { source: "pricing-section" })}
          >
            Comprar con Stripe
          </a>
          <a
            href="#acceso"
            className="micro-cta"
            onClick={() => track("ClickCTA", { source: "pricing-apply-alt" })}
          >
            Prefiero aplicar primero
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
