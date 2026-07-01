"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { VIDEOS } from "@/lib/constants";

export default function Interstitial() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      aria-label="Dubai lifestyle"
      className="relative w-full overflow-hidden
                 h-[clamp(420px,70vh,860px)]
                 max-md:h-[clamp(360px,55svh,620px)]
                 max-sm:h-[clamp(300px,50svh,480px)]"
    >
      <motion.div style={{ y }} className="interstitial-media">
        <video
          src={VIDEOS.lamboDay.src}
          poster={VIDEOS.lamboDay.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[#050505]/45 z-[1]" />
      <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-[#050505] to-transparent z-[2]
                      max-md:h-40 max-sm:h-32" />
    </section>
  );
}
