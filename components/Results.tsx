"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IMAGES, STATS, MICRO_CTAS, WHATSAPP, whatsappUrl } from "@/lib/constants";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function Results() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="resultados"
      ref={ref}
      aria-label="Resultados"
      className="bg-[#050505] section-pad grid grid-cols-2 gap-20 items-center
                 max-md:grid-cols-1 max-md:section-pad-sm max-md:gap-11
                 max-sm:gap-8"
    >
      {/* ── LEFT: Bookmap photo ───────────────────────────────────── */}
      <motion.div
        variants={scaleIn(0)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="photo-frame relative flex items-center justify-center
                   aspect-[4/5] max-md:aspect-auto max-md:order-2 max-md:w-full"
      >
        <img
          src={IMAGES.lamboNight}
          alt="Lamborghini Huracán STO de noche en Dubai Marina"
          className="max-md:!h-auto max-md:!max-h-[min(72vh,820px)]"
          loading="lazy"
        />
        {/* Subtle lime border glow */}
        <div className="absolute inset-0 rounded-[20px] ring-1 ring-lime/[0.08]" />
      </motion.div>

      {/* ── RIGHT: copy ──────────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer(0.11)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-md:order-1"
      >
        <motion.span variants={fadeUp()} className="label block mb-8 max-sm:mb-6">
          El Estándar
        </motion.span>

        <motion.h2
          variants={fadeUp()}
          className="font-bebas text-[clamp(52px,5.5vw,90px)] leading-[0.88]
                     tracking-[0.03em] text-white mb-9
                     max-sm:text-[clamp(44px,14vw,62px)] max-sm:mb-6"
        >
          RESULTADOS
          <br />
          REALES.
          <br />
          <span className="text-white/[0.18]">NO MOTIVACIÓN</span>
          <br />
          <span className="text-white/[0.18]">VACÍA.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp()}
          className="font-inter text-[15px] font-light leading-[1.9]
                     text-white/48 max-w-[370px] mb-13
                     max-sm:text-[14px] max-sm:leading-[1.75] max-sm:mb-9"
        >
          Dentro del WIA Inner Circle no encontrarás frases motivacionales
          ni cursos genéricos. Encontrarás un ecosistema de traders e
          inversores que operan con capital real, usando metodología de
          Order Flow institucional y comparten lo que realmente funciona.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={fadeUp()}
          className="grid grid-cols-3 gap-7 max-sm:grid-cols-1 max-sm:gap-4"
        >
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="max-sm:border-t max-sm:border-white/[0.08] max-sm:pt-4"
            >
              <p className="font-bebas text-[18px] tracking-[0.1em] text-lime mb-1">
                {value}
              </p>
              <p className="font-inter text-[9px] tracking-[0.18em] uppercase text-white/28">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp()}
          className="mt-10 max-sm:mt-7 flex flex-wrap items-center gap-5"
        >
          <a
            href="#acceso"
            className="btn-lime"
            onClick={() => track("ClickCTA", { source: "results-primary" })}
          >
            {MICRO_CTAS.results}
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            onClick={() => track("ClickWhatsApp", { source: "results" })}
          >
            {WHATSAPP.label}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
