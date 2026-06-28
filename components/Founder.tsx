"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FOUNDER, WHATSAPP, whatsappUrl } from "@/lib/constants";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function Founder() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="fundador"
      ref={ref}
      aria-label="Sobre el fundador"
      className="bg-[#050505] section-pad grid grid-cols-[5fr_7fr] gap-20 items-center
                 max-md:grid-cols-1 max-md:section-pad-sm max-md:gap-11"
    >
      <motion.div
        variants={scaleIn(0)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="photo-frame aspect-[4/5] relative max-md:order-1 max-md:w-full
                   max-sm:aspect-[3/4]"
      >
        <img
          src={FOUNDER.image}
          alt={`${FOUNDER.name} — ${FOUNDER.role}`}
          className="w-full h-full object-cover object-[center_top]"
          loading="lazy"
        />
        <div className="absolute inset-0 rounded-[20px] ring-1 ring-lime/[0.08]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050505]/80 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="font-bebas text-[20px] tracking-[0.18em] text-white">
            {FOUNDER.name}
          </p>
          <p className="font-inter text-[10px] tracking-[0.22em] uppercase text-lime mt-1">
            {FOUNDER.city}
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-md:order-2"
      >
        <motion.p variants={fadeUp()} className="label mb-7">
          Quién está detrás
        </motion.p>

        <motion.h2
          variants={fadeUp()}
          className="font-bebas text-[clamp(48px,5.5vw,88px)] leading-[0.9]
                     tracking-[0.03em] text-white mb-5
                     max-sm:text-[clamp(42px,14vw,60px)]"
        >
          {FOUNDER.name.toUpperCase()}.
          <br />
          <span className="text-white/[0.22]">{FOUNDER.role.toUpperCase()}.</span>
        </motion.h2>

        {/* Authority badges */}
        <motion.div
          variants={fadeUp()}
          className="flex flex-wrap items-center gap-2 mb-7 max-sm:mb-6"
        >
          {FOUNDER.badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full
                         bg-lime text-[#050505]
                         font-inter text-[10px] font-semibold tracking-[0.16em]
                         uppercase
                         max-sm:text-[9px] max-sm:tracking-[0.12em] max-sm:px-3"
            >
              <svg
                aria-hidden
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 6.3L4.9 8.7L9.7 3.6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Companies */}
        <motion.div
          variants={fadeUp()}
          className="flex flex-wrap items-center gap-2.5 mb-9 max-sm:mb-7"
        >
          {FOUNDER.companies.map((company) => (
            <span
              key={company}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full
                         border border-lime/25 bg-lime/[0.04]
                         font-inter text-[10px] font-medium tracking-[0.16em]
                         uppercase text-white/85
                         max-sm:text-[9px] max-sm:tracking-[0.12em] max-sm:px-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime" aria-hidden />
              {company}
            </span>
          ))}
          <span className="font-inter text-[10px] tracking-[0.18em] uppercase text-white/35
                           max-sm:text-[9px]">
            {FOUNDER.companiesExtra}
          </span>
        </motion.div>

        <motion.p
          variants={fadeUp()}
          className="font-inter text-[15px] font-light leading-[1.9]
                     text-white/55 max-w-[520px] mb-10
                     max-sm:text-[14px] max-sm:leading-[1.75] max-sm:mb-8"
        >
          {FOUNDER.intro}
        </motion.p>

        <motion.ul variants={fadeUp()} className="grid gap-3 mb-11 max-sm:mb-9">
          {FOUNDER.credentials.map((item) => (
            <li
              key={item}
              className="flex items-start gap-4 font-inter text-[14px] font-light text-white/75
                         max-sm:text-[13px]"
            >
              <span className="mt-[10px] w-6 h-px bg-lime flex-shrink-0" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          variants={fadeUp()}
          className="flex flex-wrap items-center gap-5"
        >
          <a
            href="#acceso"
            className="btn-lime"
            onClick={() => track("ClickCTA", { source: "founder-primary" })}
          >
            Aplicar al Inner Circle
          </a>
          <a
            href={whatsappUrl(
              "Hola Santiago, vengo de la web de WIA Inner Circle y quiero hablar contigo directamente."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            onClick={() => track("ClickWhatsApp", { source: "founder" })}
          >
            {WHATSAPP.label}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
