"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMAGES, MEDIA_FOCUS, MICRO_CTAS, focusStyle } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      aria-label="Declaración"
      className="relative w-full overflow-hidden flex items-center justify-center
                 h-[clamp(520px,100svh,960px)]
                 max-md:h-[clamp(460px,92svh,820px)]
                 max-sm:h-[clamp(400px,82svh,680px)]"
    >
      <motion.div
        style={{ y, ...focusStyle(MEDIA_FOCUS.steeringWheel) }}
        className="statement-media"
      >
        <img
          src={IMAGES.steeringWheel}
          alt="Lamborghini STO steering wheel con Rolex"
          loading="lazy"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[#050505]/60 z-[1]" />

      <div className="relative z-[2] text-center px-7 max-sm:px-[18px]">
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="label mb-9 max-sm:mb-6"
        >
          WIA Inner Circle
        </motion.p>

        <motion.h2
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-bebas text-[clamp(60px,10vw,148px)] leading-[0.87]
                     tracking-[0.03em] text-white
                     max-sm:text-[clamp(52px,17vw,78px)]"
        >
          LAS DECISIONES
          <br />
          <span className="text-lime">CORRECTAS</span>
          <br />
          CAMBIAN
          <br />
          TU VIDA.
        </motion.h2>

        <motion.div
          variants={fadeUp(0.25)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 max-sm:mt-8"
        >
          <a
            href="#acceso"
            className="btn-lime"
            onClick={() => track("ClickCTA", { source: "statement" })}
          >
            {MICRO_CTAS.statement}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
