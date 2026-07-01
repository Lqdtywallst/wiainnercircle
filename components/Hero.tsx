"use client";

import { motion } from "framer-motion";
import { BRAND, DISCIPLINES, IMAGES, MEDIA_FOCUS, RESPONSE_SLA, TELEGRAM_COMMUNITY, WHATSAPP, focusStyle, whatsappUrl } from "@/lib/constants";
import { fadeUp, scaleIn } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen min-h-[100svh] bg-[#050505] grid grid-cols-2 items-center
                 gap-14 px-[52px] overflow-hidden
                 max-md:grid-cols-1 max-md:px-6 max-md:pt-28 max-md:pb-20 max-md:gap-10
                 max-sm:px-[18px] max-sm:pt-24 max-sm:pb-14 max-sm:gap-8"
    >
      {/* Left accent line */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-lime opacity-[0.12]" />

      {/* ── LEFT: copy ──────────────────────────────────────────── */}
      <div className="pt-24 pb-16 max-md:pt-0 max-md:pb-0">
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className="label mb-9 max-sm:mb-6"
        >
          Comunidad Privada · {BRAND.parent}
        </motion.p>

        {/* Title */}
        <motion.h1
          variants={fadeUp(0.13)}
          initial="hidden"
          animate="visible"
          className="font-bebas leading-[0.9] tracking-[0.03em] text-white
                     text-[clamp(68px,8.5vw,124px)] mb-0
                     max-sm:text-[clamp(52px,18vw,76px)]"
        >
          TU SIGUIENTE
          <br />
          <span className="text-lime">NIVEL</span>
          <br />
          EMPIEZA
          <br />
          AQUÍ.
        </motion.h1>

        {/* Discipline tags */}
        <motion.div
          variants={fadeUp(0.26)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-x-6 gap-y-3 mt-11 mb-13
                     max-sm:mt-8 max-sm:mb-9 max-sm:gap-x-4"
        >
          {DISCIPLINES.map((tag) => (
            <span
              key={tag}
              className="font-inter text-[10px] tracking-[0.18em] uppercase text-white/35
                         max-sm:text-[9px] max-sm:tracking-[0.14em]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA — formulario primero, WhatsApp como alternativa */}
        <motion.div
          variants={fadeUp(0.37)}
          initial="hidden"
          animate="visible"
          className="mt-11 max-sm:mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contacto-rapido"
            className="btn-lime"
            onClick={() => track("ClickCTA", { source: "hero-primary" })}
          >
            {BRAND.whatsappCta}
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost max-sm:hidden"
            onClick={() => track("ClickWhatsApp", { source: "hero" })}
          >
            {WHATSAPP.label}
          </a>
          {TELEGRAM_COMMUNITY.url ? (
            <a
              href={TELEGRAM_COMMUNITY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="micro-cta max-sm:w-full max-sm:justify-center"
              onClick={() => track("ClickTelegram", { source: "hero" })}
            >
              {TELEGRAM_COMMUNITY.cta}
            </a>
          ) : null}
        </motion.div>

        {/* Sub note */}
        <motion.p
          variants={fadeUp(0.46)}
          initial="hidden"
          animate="visible"
          className="font-inter text-[10px] tracking-[0.12em] text-white/20 mt-5
                     max-sm:max-w-[260px] max-sm:leading-relaxed"
        >
          Acceso por solicitud únicamente · {RESPONSE_SLA.promiseShort}
        </motion.p>
      </div>

      {/* ── RIGHT: photo ─────────────────────────────────────────── */}
      <motion.div
        variants={scaleIn(0.15)}
        initial="hidden"
        animate="visible"
        style={focusStyle(MEDIA_FOCUS.hero)}
        className="photo-frame photo-focused relative flex items-center justify-center
                   h-[88vh] max-md:h-auto max-md:min-h-0 max-md:w-full"
      >
        <img
          src={IMAGES.hero}
          alt="Santiago en terraza Dubai Marina"
          className="max-md:max-h-[min(72vh,820px)] max-md:h-auto max-md:w-full"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>
    </section>
  );
}
