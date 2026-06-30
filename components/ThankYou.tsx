"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  RESPONSE_SLA,
  TELEGRAM_COMMUNITY,
  THANK_YOU,
  WHATSAPP,
  whatsappUrl,
} from "@/lib/constants";
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

      {/* Primary action: calendar or WhatsApp */}
      {THANK_YOU.calendarUrl ? (
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[980px] mb-10"
        >
          <div className="text-center mb-6">
            <p className="font-bebas text-[28px] tracking-[0.06em] text-white mb-2">
              {THANK_YOU.calendarTitle}
            </p>
            <p className="font-inter text-[12px] tracking-[0.18em] uppercase text-lime">
              {THANK_YOU.calendarNote}
            </p>
          </div>
          <div className="rounded-[20px] overflow-hidden border border-lime/20 ring-1 ring-lime/[0.08]">
            <iframe
              src={THANK_YOU.calendarUrl}
              title={THANK_YOU.calendarTitle}
              className="w-full h-[680px] bg-[#0a0a0a] max-sm:h-[560px]"
              loading="lazy"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[620px] mb-10 text-center border border-white/[0.08]
                     rounded-[18px] p-8 max-sm:p-6"
        >
          <p className="font-bebas text-[22px] tracking-[0.06em] text-white mb-3">
            Siguiente paso: habla con Santiago
          </p>
          <p className="font-inter text-[13px] font-light text-white/50 mb-6 leading-[1.7]">
            Escríbenos por WhatsApp ahora y adelanta la conversación. {RESPONSE_SLA.promiseShort}.
          </p>
          <a
            href={whatsappUrl(
              "Hola Santiago, acabo de aplicar al Inner Circle y me gustaría adelantar la conversación."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lime"
            onClick={() => track("ClickWhatsApp", { source: "thank-you-primary" })}
          >
            {THANK_YOU.whatsappPrompt}
          </a>
        </motion.div>
      )}

      <motion.ol
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-7 max-w-[980px] w-full mb-12
                   max-md:grid-cols-1 max-sm:mb-10"
      >
        {THANK_YOU.steps.map((step) => (
          <motion.li
            key={step.label}
            variants={fadeUp()}
            className="border border-white/[0.07] rounded-[18px] p-7 max-sm:p-6"
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

      <motion.div
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-4 text-center"
      >
        {THANK_YOU.calendarUrl ? (
          <a
            href={whatsappUrl(
              "Hola Santiago, acabo de aplicar al Inner Circle y me gustaría adelantar la conversación."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            onClick={() => track("ClickWhatsApp", { source: "thank-you" })}
          >
            {THANK_YOU.whatsappPrompt}
          </a>
        ) : null}

        {TELEGRAM_COMMUNITY.url ? (
          <a
            href={TELEGRAM_COMMUNITY.url}
            target="_blank"
            rel="noopener noreferrer"
            className="micro-cta"
            onClick={() => track("ClickTelegram", { source: "thank-you" })}
          >
            {TELEGRAM_COMMUNITY.cta}
          </a>
        ) : null}

        <p className="font-inter text-[10px] tracking-[0.18em] uppercase text-white/35">
          {WHATSAPP.label} · {RESPONSE_SLA.promiseShort}
        </p>
      </motion.div>
    </section>
  );
}
