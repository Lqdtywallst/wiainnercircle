"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  INCOME_OPTIONS,
  URGENCY,
  WHATSAPP,
  whatsappUrl,
} from "@/lib/constants";
import { createLeadEventId, submitLead } from "@/lib/lead-client";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { track } from "@/lib/tracking";

interface FormData {
  nombre: string;
  whatsapp: string;
  ingresos: string;
}

const INITIAL: FormData = {
  nombre: "",
  whatsapp: "",
  ingresos: "",
};

export default function Form() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const router = useRouter();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (!touched) {
      setTouched(true);
      track("FormStart");
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function isValid() {
    return form.nombre.trim() && form.whatsapp.trim() && form.ingresos;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid()) return;

    setSubmitting(true);
    setErrorMessage(null);

    const eventId = createLeadEventId();

    try {
      const result = await submitLead({
        nombre: form.nombre,
        whatsapp: form.whatsapp,
        ingresos: form.ingresos,
        formType: "full",
        honeypot,
        eventId,
      });

      if (!result.ok) {
        throw new Error(result.error || "Error al enviar la solicitud");
      }

      track("Lead", { ingresos: form.ingresos, form: "single-step", eventId });
      router.push("/gracias");
    } catch (err) {
      setSubmitting(false);
      const message =
        err instanceof Error
          ? err.message
          : "No pudimos enviar tu solicitud. Inténtalo de nuevo en unos segundos.";
      setErrorMessage(message);
    }
  }

  const whatsappPrefill = whatsappUrl(
    `Hola Santiago, quiero aplicar al Inner Circle.${
      form.nombre ? ` Soy ${form.nombre}.` : ""
    }`
  );

  return (
    <section
      id="acceso"
      ref={ref}
      aria-label="Formulario de acceso"
      className="bg-[#050505] section-pad flex flex-col items-center
                 max-md:section-pad-sm relative"
    >
      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center mb-12 max-sm:mb-9"
      >
        <motion.p variants={fadeUp()} className="label mb-7">
          Aplicar al Inner Circle
        </motion.p>
        <motion.h2
          variants={fadeUp()}
          className="font-bebas text-[clamp(48px,6vw,88px)] leading-[0.9]
                     tracking-[0.03em] text-white mb-5
                     max-sm:text-[clamp(42px,14vw,60px)]"
        >
          EL PRIMER PASO
          <br />
          ES <span className="text-lime">TUYO.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp()}
          className="font-inter text-[14px] font-light text-white/45
                     max-w-[460px] mx-auto leading-[1.8] tracking-[0.02em]
                     max-sm:text-[13px] max-sm:leading-[1.7]"
        >
          {URGENCY.formNote}. Completa el formulario o escríbenos directo por WhatsApp.
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeUp(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full max-w-[620px] mb-7"
      >
        <p className="urgency-strip rounded-md">{URGENCY.banner}</p>
      </motion.div>

      <motion.form
        variants={fadeUp(0.2)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-[620px] flex flex-col gap-5 max-sm:gap-4"
      >
        <p className="font-inter text-[10px] tracking-[0.24em] uppercase text-white/35 mb-1">
          Solo 3 campos · 30 segundos
        </p>

        <div>
          <label htmlFor="nombre" className="field-label">Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="field-label">WhatsApp</label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            placeholder="+34 600 000 000"
            value={form.whatsapp}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="ingresos" className="field-label">Ingresos mensuales actuales</label>
          <select
            id="ingresos"
            name="ingresos"
            required
            value={form.ingresos}
            onChange={handleChange}
            className="input-field"
          >
            {INCOME_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn-lime w-full text-center mt-2 disabled:opacity-50 disabled:cursor-wait"
          disabled={!isValid() || submitting}
        >
          {submitting ? "Enviando…" : "Enviar solicitud"}
        </button>

        <div className="relative flex items-center my-1">
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="px-4 font-inter text-[9px] tracking-[0.28em] uppercase text-white/30">
            o más rápido
          </span>
          <span className="flex-1 h-px bg-white/[0.06]" />
        </div>

        <a
          href={whatsappPrefill}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost w-full justify-center"
          onClick={() => track("ClickWhatsApp", { source: "form" })}
        >
          {WHATSAPP.label}
        </a>

        <div
          aria-hidden="true"
          className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
        >
          <label htmlFor="website">No completar</label>
          <input
            id="website"
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

        <p className="font-inter text-[10px] text-white/22 text-center tracking-[0.08em]
                      max-sm:leading-relaxed">
          {URGENCY.spotsLeft} · Solo aceptamos perfiles serios.
        </p>
      </motion.form>
    </section>
  );
}
