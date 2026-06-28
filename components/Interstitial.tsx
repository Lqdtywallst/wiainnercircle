"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { VIDEOS } from "@/lib/constants";

export default function Interstitial() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      aria-label="Dubai lifestyle"
      className="relative h-[70vh] overflow-hidden
                 max-md:h-[60svh] max-md:min-h-[440px]
                 max-sm:min-h-[380px]"
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
    </section>
  );
}
