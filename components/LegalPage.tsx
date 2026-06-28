"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}

export default function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <section
      aria-label={title}
      className="bg-[#050505] section-pad pt-[160px] max-md:section-pad-sm max-md:pt-[120px]"
    >
      <motion.article
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="visible"
        className="max-w-[820px] mx-auto"
      >
        <motion.p variants={fadeUp()} className="label mb-6">
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp()}
          className="font-bebas text-[clamp(50px,6vw,96px)] leading-[0.92]
                     tracking-[0.03em] text-white mb-4
                     max-sm:text-[clamp(42px,14vw,64px)]"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeUp()}
          className="font-inter text-[11px] tracking-[0.22em] uppercase text-white/35 mb-14
                     max-sm:mb-10"
        >
          Última actualización · {updated}
        </motion.p>

        <div className="grid gap-12 max-sm:gap-9">
          {sections.map((section) => (
            <motion.section key={section.heading} variants={fadeUp()}>
              <h2 className="font-bebas text-[24px] tracking-[0.08em] text-lime mb-5">
                {section.heading}
              </h2>
              <div className="grid gap-4">
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-inter text-[15px] font-light leading-[1.85]
                               text-white/65 max-sm:text-[14px] max-sm:leading-[1.75]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </motion.article>
    </section>
  );
}
