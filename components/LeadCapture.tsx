"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LEAD_CAPTURE } from "@/lib/constants";
import { createLeadEventId, submitLead } from "@/lib/lead-client";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function LeadCapture() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !whatsapp.trim()) return;

    setSubmitting(true);
    setErrorMessage(null);

    const eventId = createLeadEventId();
    const result = await submitLead({
      nombre,
      whatsapp,
      formType: "quick",
      honeypot,
      eventId,
    });

    if (!result.ok) {
      setSubmitting(false);
      setErrorMessage(result.error ?? "Error al enviar");
      return;
    }

    track("Lead", { ingresos: "pending", form: "quick-capture", eventId });
    router.push("/gracias");
  }

  return (
    <section
      id="contacto-rapido"
      ref={ref}
      aria-label="Contacto rápido"
      className="bg-[#050505] section-pad-sm flex flex-col items-center
                 max-md:py-16 border-y border-white/[0.06]"
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full max-w-[620px]"
      >
        <motion.p variants={fadeUp()} className="label mb-6 text-center">
          {LEAD_CAPTURE.eyebrow}
        </motion.p>

        <motion.h2
          variants={fadeUp()}
          className="font-bebas text-[clamp(40px,5vw,72px)] leading-[0.9]
                     tracking-[0.03em] text-white text-center mb-5
                     max-sm:text-[clamp(36px,12vw,52px)]"
        >
          {LEAD_CAPTURE.title}
          <br />
          <span className="text-lime">{LEAD_CAPTURE.titleAccent}</span>
        </motion.h2>

        <motion.p
          variants={fadeUp()}
          className="font-inter text-[14px] font-light text-white/45 text-center
                     leading-[1.75] mb-8 max-w-[480px] mx-auto max-sm:text-[13px]"
        >
          {LEAD_CAPTURE.body}
        </motion.p>

        <motion.form
          variants={fadeUp(0.1)}
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4 relative"
        >
          <p className="font-inter text-[10px] tracking-[0.24em] uppercase text-white/35 text-center">
            {LEAD_CAPTURE.note}
          </p>

          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label htmlFor="quick-nombre" className="field-label">
                Nombre
              </label>
              <input
                id="quick-nombre"
                name="nombre"
                type="text"
                required
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="quick-whatsapp" className="field-label">
                WhatsApp
              </label>
              <input
                id="quick-whatsapp"
                name="whatsapp"
                type="tel"
                required
                placeholder="+34 600 000 000"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-lime w-full text-center mt-1 disabled:opacity-50 disabled:cursor-wait"
            disabled={!nombre.trim() || !whatsapp.trim() || submitting}
          >
            {submitting ? "Enviando…" : LEAD_CAPTURE.cta}
          </button>

          <a
            href="#acceso"
            className="font-inter text-[10px] tracking-[0.16em] uppercase text-white/30
                       text-center hover:text-lime transition-colors duration-200"
            onClick={() => track("ClickCTA", { source: "lead-capture-skip" })}
          >
            {LEAD_CAPTURE.skip}
          </a>

          <div
            aria-hidden="true"
            className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
          >
            <label htmlFor="quick-website">No completar</label>
            <input
              id="quick-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="font-inter text-[12px] text-red-300 text-center tracking-[0.02em]
                         border border-red-300/30 rounded-md py-2 px-3"
            >
              {errorMessage}
            </p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
}
