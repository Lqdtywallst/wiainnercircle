"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TESTIMONIALS, MICRO_CTAS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonios"
      ref={ref}
      aria-label="Lo que dicen los miembros"
      className="bg-[#050505] section-pad max-md:section-pad-sm"
    >
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1180px] mx-auto"
      >
        <div className="flex items-end justify-between gap-10 mb-14 max-sm:flex-col max-sm:items-start max-sm:gap-6 max-sm:mb-10">
          <div>
            <motion.p variants={fadeUp()} className="label mb-6">
              Lo que dicen dentro
            </motion.p>
            <motion.h2
              variants={fadeUp()}
              className="font-bebas text-[clamp(44px,5vw,80px)] leading-[0.9]
                         tracking-[0.03em] text-white
                         max-sm:text-[clamp(40px,13vw,58px)]"
            >
              VOCES DE LA
              <br />
              <span className="text-lime">COMUNIDAD.</span>
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp()}
            href="#acceso"
            className="micro-cta"
            onClick={() => track("ClickCTA", { source: "testimonials-header" })}
          >
            {MICRO_CTAS.gallery}
          </motion.a>
        </div>

        <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1 max-md:gap-5">
          {TESTIMONIALS.map(({ quote, name, role }) => (
            <motion.figure
              key={name}
              variants={fadeUp()}
              className="border border-white/[0.07] rounded-[18px] p-9 bg-white/[0.015]
                         max-sm:p-7"
            >
              <blockquote className="font-inter text-[17px] font-light leading-[1.65] text-white/85 mb-7
                                     max-sm:text-[15px] max-sm:leading-[1.6] max-sm:mb-5">
                “{quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="block w-7 h-px bg-lime/60" />
                <span className="font-inter text-[12px] text-white/70 tracking-[0.04em]">
                  {name}
                </span>
                <span className="font-inter text-[10px] uppercase tracking-[0.18em] text-white/30">
                  {role}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
