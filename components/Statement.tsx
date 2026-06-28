"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMAGES, MICRO_CTAS } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtle parallax: photo moves slightly as you scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      aria-label="Declaración"
      className="relative min-h-screen min-h-[100svh] overflow-hidden flex items-center justify-center
                 max-sm:min-h-[82svh]"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-[-10%] z-0"
      >
        <img
          src={IMAGES.steeringWheel}
          alt="Lamborghini STO steering wheel con Rolex"
          className="w-full h-full object-cover object-[center_35%]
                     max-md:object-[center_40%]"
          loading="lazy"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#050505]/60 z-[1]" />

      {/* Text */}
      <div className="relative z-[2] text-center px-7">
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
