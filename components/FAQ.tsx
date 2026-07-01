"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FAQ as FAQ_ITEMS, FAQ_PRICING_INDEX, MICRO_CTAS } from "@/lib/constants";
import { fadeUp, staggerContainer, EASE_OUT_EXPO } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(FAQ_PRICING_INDEX);

  return (
    <section
      id="faq"
      ref={ref}
      aria-label="Preguntas frecuentes"
      className="bg-[#050505] section-pad max-md:section-pad-sm"
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[860px] mx-auto"
      >
        <motion.p variants={fadeUp()} className="label mb-7">
          Preguntas frecuentes
        </motion.p>

        <motion.h2
          variants={fadeUp()}
          className="font-bebas text-[clamp(44px,5vw,80px)] leading-[0.9]
                     tracking-[0.03em] text-white mb-14
                     max-sm:text-[clamp(40px,13vw,58px)] max-sm:mb-10"
        >
          LO QUE TE
          <br />
          <span className="text-white/[0.22]">PREGUNTAS</span>
          <span className="text-white"> ANTES DE ENTRAR.</span>
        </motion.h2>

        <motion.div variants={fadeUp()} className="border-t border-white/[0.08]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => {
                    setOpen(isOpen ? null : i);
                    track("ClickCTA", { source: "faq", question: item.q });
                  }}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="font-inter text-[15px] font-light leading-[1.8] text-white/55 pb-7 pr-8
                                    max-sm:text-[14px] max-sm:pr-2">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp()} className="mt-14 text-center max-sm:mt-10">
          <a
            href="#acceso"
            className="btn-lime"
            onClick={() => track("ClickCTA", { source: "faq-footer" })}
          >
            {MICRO_CTAS.faq}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
