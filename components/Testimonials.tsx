"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TESTIMONIALS, MICRO_CTAS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { track } from "@/lib/tracking";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-50"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

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
          {TESTIMONIALS.map(({ quote, name, role, avatar, social }) => (
            <motion.figure
              key={name}
              variants={fadeUp()}
              className="border border-white/[0.07] rounded-[18px] p-9 bg-white/[0.015]
                         max-sm:p-7"
            >
              <div className="flex items-center gap-4 mb-6 max-sm:mb-5">
                {avatar ? (
                  <img
                    src={avatar}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover object-top flex-shrink-0
                               ring-1 ring-white/10"
                    loading="lazy"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center
                               bg-lime text-[#050505] font-inter text-[13px] font-semibold"
                  >
                    {initials(name)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-inter text-[14px] font-semibold text-white tracking-[0.02em]">
                    {name}
                  </p>
                  <p className="font-inter text-[11px] uppercase tracking-[0.14em] text-white/40 mt-0.5">
                    {role}
                  </p>
                </div>
              </div>

              <blockquote className="font-inter text-[17px] font-light leading-[1.65] text-white/85 mb-6
                                     max-sm:text-[15px] max-sm:leading-[1.6] max-sm:mb-5">
                “{quote}”
              </blockquote>

              <figcaption>
                <span className="inline-flex items-center gap-2 font-inter text-[11px] text-white/35 tracking-[0.04em]">
                  <InstagramIcon />
                  {social.handle}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
