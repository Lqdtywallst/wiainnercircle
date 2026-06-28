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
    position: "object-[center_60%]",
    mobileAspect: "aspect-[4/5]",
  },
  {
    src: IMAGES.lamboSto,
    alt: "Lamborghini Huracán STO parking Dubai",
    gridClass: "col-span-5 row-span-1",
    position: "object-center",
    mobileAspect: "aspect-[4/3]",
  },
  {
    src: IMAGES.deskDay,
    alt: "Santiago en su desk con vista a Dubai",
    gridClass: "col-span-5 row-span-1",
    position: "object-[center_top]",
    mobileAspect: "aspect-[4/3]",
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
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="font-inter text-[10px] font-medium tracking-[0.3em] uppercase
                   text-white/22 mb-13 max-sm:mb-8 max-sm:text-[9px]"
      >
        El Entorno
      </motion.p>

      {/* Desktop grid: 12 cols × 2 rows */}
      <div
        className="hidden md:grid grid-cols-12 grid-rows-2 gap-[14px]"
        style={{ gridTemplateRows: "340px 340px" }}
      >
        {photos.map(({ src, alt, gridClass, position }, i) => (
          <motion.div
            key={alt}
            variants={scaleIn(i * 0.08)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`photo-frame ${gridClass}`}
          >
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover ${position}`}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile: stack with photo-natural aspect ratios */}
      <div className="md:hidden flex flex-col gap-3 max-sm:gap-2.5">
        {photos.map(({ src, alt, position, mobileAspect }, i) => (
          <motion.div
            key={alt}
            variants={scaleIn(i * 0.08)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`photo-frame relative ${mobileAspect}`}
          >
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover ${position}`}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
