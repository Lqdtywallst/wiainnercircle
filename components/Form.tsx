"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  INCOME_OPTIONS,
  URGENCY,
  WHATSAPP,
  whatsappUrl,
} from "@/lib/constants";
import { fadeUp, staggerContainer, EASE_OUT_EXPO } from "@/lib/motion";
import { track } from "@/lib/tracking";

interface FormData {
  nombre: string;
  whatsapp: string;
  ingresos: string;
  email: string;
  ocupacion: string;
  objetivo: string;
}

const INITIAL: FormData = {
  nombre: "", whatsapp: "", ingresos: "",
  email: "", ocupacion: "", objetivo: "",
};

export default function Form() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const router = useRouter();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Honeypot — must remain empty. Bots fill it, humans don't see it.
  const [honeypot, setHoneypot] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    if (!touched) {
      setTouched(true);
      track("FormStart");
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function step1Valid() {
    return form.nombre.trim() && form.whatsapp.trim() && form.ingresos;
  }

  function goToStep2(e: React.FormEvent) {
    e.preventDefault();
    if (!step1Valid()) return;
    setStep(2);
    track("FormStep", { step: 2 });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!step1Valid()) {
      setStep(1);
      return;
    }
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: honeypot,
          source: typeof window !== "undefined" ? window.location.pathname : "/",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Error al enviar la solicitud");
      }

      track("Lead", {
        ingresos: form.ingresos,
        ocupacion: form.ocupacion || "n/a",
      });
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
                 max-md:section-pad-sm"
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

      {/* Urgency strip just above the form */}
      <motion.div
        variants={fadeUp(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full max-w-[620px] mb-7"
      >
        <p className="urgency-strip rounded-md">{URGENCY.banner}</p>
      </motion.div>

      {/* Form */}
      <motion.form
          variants={fadeUp(0.2)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          onSubmit={step === 1 ? goToStep2 : handleSubmit}
          noValidate
          className="w-full max-w-[620px] flex flex-col gap-5 max-sm:gap-4"
        >
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-1">
            <span className="font-inter text-[10px] tracking-[0.24em] uppercase text-white/35">
              Paso {step} de 2
            </span>
            <span className="font-inter text-[10px] tracking-[0.18em] uppercase text-white/30">
              {step === 1 ? "30 segundos" : "Casi listo"}
            </span>
          </div>

          <div className="h-px bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full bg-lime"
              initial={false}
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className="flex flex-col gap-5 max-sm:gap-4"
              >
                <div>
                  <label htmlFor="nombre" className="field-label">Nombre completo</label>
                  <input
                    id="nombre" name="nombre" type="text" required
                    placeholder="Tu nombre"
                    value={form.nombre} onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="field-label">WhatsApp</label>
                  <input
                    id="whatsapp" name="whatsapp" type="tel" required
                    placeholder="+34 600 000 000"
                    value={form.whatsapp} onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="ingresos" className="field-label">Ingresos mensuales actuales</label>
                  <select
                    id="ingresos" name="ingresos" required
                    value={form.ingresos} onChange={handleChange}
                    className="input-field"
                  >
                    {INCOME_OPTIONS.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-lime w-full text-center mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={!step1Valid()}
                >
                  Continuar
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
                  onClick={() => track("ClickWhatsApp", { source: "form-step-1" })}
                >
                  {WHATSAPP.label}
                </a>
              </motion.div>
            ) : (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className="flex flex-col gap-5 max-sm:gap-4"
              >
                <div>
                  <label htmlFor="email" className="field-label">Email</label>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="tu@email.com"
                    value={form.email} onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="ocupacion" className="field-label">Ocupación actual</label>
                  <input
                    id="ocupacion" name="ocupacion" type="text"
                    placeholder="Emprendedor / Trader / ..."
                    value={form.ocupacion} onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="objetivo" className="field-label">¿Qué quieres lograr?</label>
                  <textarea
                    id="objetivo" name="objetivo" rows={4}
                    placeholder="Cuéntanos tu situación y objetivo principal..."
                    value={form.objetivo} onChange={handleChange}
                    className="input-field resize-none"
                  />
                </div>

                <div className="grid grid-cols-[1fr_2fr] gap-3 mt-2 max-sm:grid-cols-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-ghost w-full justify-center"
                    disabled={submitting}
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    className="btn-lime w-full text-center disabled:opacity-50 disabled:cursor-wait"
                    disabled={submitting}
                  >
                    {submitting ? "Enviando…" : "Enviar solicitud"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Honeypot — must remain empty (hidden from real users) */}
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
