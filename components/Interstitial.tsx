"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { VIDEOS } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";

export default function Interstitial() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      aria-label="Dubai lifestyle"
      className="relative h-[70vh] overflow-hidden flex items-end px-[52px] pb-16
                 max-md:h-[60svh] max-md:min-h-[440px] max-md:px-6 max-md:pb-10
                 max-sm:min-h-[380px] max-sm:px-[18px] max-sm:pb-8"
    >
      {/* Parallax video */}
      <motion.div style={{ y }} className="absolute inset-[-10%] z-0">
        <video
          src={VIDEOS.lamboDay.src}
          poster={VIDEOS.lamboDay.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="w-full h-full object-cover object-[center_30%]"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#050505]/45 z-[1]" />
      <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-[#050505] to-transparent z-[2]" />

      {/* Caption */}
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-[3]"
      >
        <p className="font-bebas text-[clamp(28px,3vw,44px)] tracking-[0.1em] text-white/55
                      max-sm:text-[26px] max-sm:tracking-[0.08em]">
          Lamborghini Huracán STO
        </p>
      </motion.div>
    </section>
  );
}
