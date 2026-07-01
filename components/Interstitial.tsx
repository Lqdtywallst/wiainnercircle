"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MEDIA_FOCUS, VIDEOS, focusStyle } from "@/lib/constants";

export default function Interstitial() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={ref}
      aria-label="Dubai lifestyle"
      className="relative w-full overflow-hidden
                 h-[clamp(540px,80vh,960px)]
                 max-md:h-[clamp(460px,68svh,740px)]
                 max-sm:h-[clamp(400px,62svh,620px)]"
    >
      <motion.div
        style={{ y, ...focusStyle(MEDIA_FOCUS.lamboDayVideo) }}
        className="interstitial-media"
      >
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
