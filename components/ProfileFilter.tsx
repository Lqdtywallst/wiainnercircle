"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PROFILE_FILTER } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function ProfileFilter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="perfil"
      ref={ref}
      aria-label="¿Encaja contigo?"
      className="bg-[#050505] section-pad max-md:section-pad-sm"
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1180px] mx-auto"
      >
        <motion.h2
          variants={fadeUp()}
          className="font-bebas text-[clamp(44px,5vw,80px)] leading-[0.9]
                     tracking-[0.03em] text-white mb-14 text-center
                     max-sm:text-[clamp(40px,13vw,58px)] max-sm:mb-10"
        >
          {PROFILE_FILTER.title}
        </motion.h2>

        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-6">
          <motion.div
            variants={fadeUp()}
            className="border border-white/[0.07] border-l-[3px] border-l-[#22c55e]
                       rounded-[18px] p-8 bg-white/[0.015] max-sm:p-6"
          >
            <h3 className="font-inter text-[11px] font-semibold tracking-[0.22em]
                           uppercase text-[#22c55e] mb-6">
              {PROFILE_FILTER.forYou.heading}
            </h3>
            <ul className="grid gap-4">
              {PROFILE_FILTER.forYou.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-inter text-[14px] font-light
                             leading-[1.7] text-white/75 max-sm:text-[13px]"
                >
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#22c55e] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp()}
            className="border border-white/[0.07] border-l-[3px] border-l-[#ef4444]
                       rounded-[18px] p-8 bg-white/[0.015] max-sm:p-6"
          >
            <h3 className="font-inter text-[11px] font-semibold tracking-[0.22em]
                           uppercase text-[#ef4444] mb-6">
              {PROFILE_FILTER.notForYou.heading}
            </h3>
            <ul className="grid gap-4">
              {PROFILE_FILTER.notForYou.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-inter text-[14px] font-light
                             leading-[1.7] text-white/75 max-sm:text-[13px]"
                >
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#ef4444] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div variants={fadeUp()} className="mt-12 text-center max-sm:mt-10">
          <a
            href="#acceso"
            className="btn-lime"
            onClick={() => track("ClickCTA", { source: "profile-filter" })}
          >
            {PROFILE_FILTER.cta}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
