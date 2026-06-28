"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { VALUE_STACK, MICRO_CTAS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function ValueStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="dentro"
      ref={ref}
      aria-label="Qué encuentras dentro"
      className="bg-[#050505] section-pad max-md:section-pad-sm"
    >
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1180px] mx-auto"
      >
        <motion.p variants={fadeUp()} className="label mb-7">
          Qué encuentras dentro
        </motion.p>

        <motion.h2
          variants={fadeUp()}
          className="font-bebas text-[clamp(48px,5.5vw,86px)] leading-[0.9]
                     tracking-[0.03em] text-white mb-16
                     max-sm:text-[clamp(42px,14vw,60px)] max-sm:mb-10"
        >
          UN ENTORNO,
          <br />
          NO UN CURSO.
        </motion.h2>

        <div className="grid grid-cols-3 gap-10 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-7">
          {VALUE_STACK.map(({ title, body }, i) => (
            <motion.div
              key={title}
              variants={fadeUp()}
              className="border-t border-white/[0.08] pt-7"
            >
              <p className="font-bebas text-[14px] tracking-[0.32em] text-lime mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-bebas text-[24px] tracking-[0.04em] text-white mb-4 leading-tight">
                {title}
              </h3>
              <p className="font-inter text-[14px] font-light leading-[1.75] text-white/55">
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp()} className="mt-16 max-sm:mt-10">
          <a
            href="#acceso"
            className="micro-cta"
            onClick={() => track("ClickCTA", { source: "value-stack" })}
          >
            {MICRO_CTAS.results}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
