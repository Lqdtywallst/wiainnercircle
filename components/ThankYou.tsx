"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { THANK_YOU, WHATSAPP, whatsappUrl } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function ThankYou() {
  useEffect(() => {
    track("Lead", { stage: "thank-you-view" });
  }, []);

  return (
    <section
      aria-label="Solicitud recibida"
      className="bg-[#050505] section-pad pt-[180px] flex flex-col items-center
                 max-md:section-pad-sm max-md:pt-[140px]"
    >
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="text-center max-w-[680px] mb-16 max-sm:mb-10"
      >
        <motion.p variants={fadeUp()} className="label mb-7">
          {THANK_YOU.eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp()}
          className="font-bebas text-[clamp(56px,7vw,108px)] leading-[0.9]
                     tracking-[0.03em] text-white mb-7
                     max-sm:text-[clamp(46px,15vw,68px)]"
        >
          BIENVENIDO AL
          <br />
          <span className="text-lime">PRIMER FILTRO.</span>
        </motion.h1>
        <motion.p
          variants={fadeUp()}
          className="font-inter text-[15px] font-light text-white/55
                     leading-[1.8] tracking-[0.02em] mx-auto
                     max-sm:text-[14px]"
        >
          {THANK_YOU.body}
        </motion.p>
      </motion.div>

      {/* Steps */}
      <motion.ol
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-7 max-w-[980px] w-full mb-16
                   max-md:grid-cols-1 max-sm:mb-12"
      >
        {THANK_YOU.steps.map((step) => (
          <motion.li
            key={step.label}
            variants={fadeUp()}
            className="border border-white/[0.07] rounded-[18px] p-7
                       max-sm:p-6"
          >
            <p className="font-bebas text-[14px] tracking-[0.32em] text-lime mb-3">
              {step.label}
            </p>
            <p className="font-bebas text-[22px] tracking-[0.04em] text-white mb-3 leading-tight">
              {step.title}
            </p>
            <p className="font-inter text-[13px] font-light leading-[1.7] text-white/55">
              {step.body}
            </p>
          </motion.li>
        ))}
      </motion.ol>

      {/* Calendar (optional) */}
      {THANK_YOU.calendarUrl ? (
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[980px] mb-12 rounded-[20px] overflow-hidden border border-white/[0.08]"
        >
          <iframe
            src={THANK_YOU.calendarUrl}
            title="Reserva tu llamada de calificación"
            className="w-full h-[680px] bg-[#0a0a0a]"
            loading="lazy"
          />
        </motion.div>
      ) : (
        <motion.p
          variants={fadeUp()}
          initial="hidden"
          animate="visible"
          className="font-inter text-[11px] tracking-[0.2em] uppercase text-white/35 mb-9"
        >
          Acelera la conversación · Disponibilidad limitada
        </motion.p>
      )}

      {/* WhatsApp shortcut */}
      <motion.div
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-4 text-center"
      >
        <a
          href={whatsappUrl(
            "Hola Santiago, acabo de aplicar al Inner Circle y me gustaría adelantar la conversación."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-lime"
          onClick={() => track("ClickWhatsApp", { source: "thank-you" })}
        >
          {THANK_YOU.whatsappPrompt}
        </a>
        <p className="font-inter text-[10px] tracking-[0.18em] uppercase text-white/35">
          {WHATSAPP.label} · Respuesta en horario Dubai
        </p>
      </motion.div>
    </section>
  );
}
