"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IMAGES } from "@/lib/constants";
import { scaleIn } from "@/lib/motion";

const photos = [
  {
    src: IMAGES.urus,
    alt: "Lamborghini Urus turquesa Dubai",
    gridClass: "col-span-7 row-span-2",
  },
  {
    src: IMAGES.lamboSto,
    alt: "Lamborghini Huracán STO parking Dubai",
    gridClass: "col-span-5 row-span-1",
  },
  {
    src: IMAGES.deskDay,
    alt: "Santiago en su desk con vista a Dubai",
    gridClass: "col-span-5 row-span-1",
  },
] as const;

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="galeria"
      ref={ref}
      aria-label="Galería"
      className="bg-[#050505] px-[52px] py-[120px]
                 max-md:px-6 max-md:py-20 max-sm:px-[18px] max-sm:py-16"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="font-inter text-[10px] font-medium tracking-[0.3em] uppercase
                   text-white/22 mb-13 max-sm:mb-8 max-sm:text-[9px]"
      >
        El Entorno
      </motion.p>

      {/* Desktop: 12-col grid — contain inside cells */}
      <div
        className="hidden md:grid grid-cols-12 gap-[14px]"
        style={{
          gridTemplateRows: "minmax(300px, 38vh) minmax(280px, 34vh)",
        }}
      >
        {photos.map(({ src, alt, gridClass }, i) => (
          <motion.div
            key={alt}
            variants={scaleIn(i * 0.08)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`photo-frame flex items-center justify-center ${gridClass}`}
          >
            <img src={src} alt={alt} loading="lazy" />
          </motion.div>
        ))}
      </div>

      {/* Mobile: stack — natural height, full photo visible */}
      <div className="md:hidden flex flex-col gap-3 max-sm:gap-2.5">
        {photos.map(({ src, alt }, i) => (
          <motion.div
            key={alt}
            variants={scaleIn(i * 0.08)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="photo-frame-fluid"
          >
            <img src={src} alt={alt} loading="lazy" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
