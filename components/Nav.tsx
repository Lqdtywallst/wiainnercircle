"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BRAND, FAVICONS, NAV_LINKS } from "@/lib/constants";
import { track } from "@/lib/tracking";

export default function Nav() {
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 80],
    ["rgba(5,5,5,0)", "rgba(5,5,5,0.97)"]
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.06]);

  return (
    <motion.nav
      style={{ background }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[52px] py-6
                 max-md:px-6 max-sm:px-[18px] max-sm:py-4"
    >
      {/* Border bottom that fades in on scroll */}
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-white"
      />

      {/* Logo */}
      <a
        href="/"
        className="flex items-center gap-3 no-underline max-sm:gap-2"
      >
        <img
          src={FAVICONS.svg}
          alt="WIA Inner Circle"
          className="h-8 w-8 max-sm:h-7 max-sm:w-7"
        />
        <span
          className="font-bebas text-[18px] tracking-[0.28em] text-white
                     max-sm:text-[16px] max-sm:tracking-[0.22em]"
        >
          {BRAND.nameShort}
          <span className="text-lime ml-2 max-xs:hidden">INNER CIRCLE</span>
        </span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="font-inter text-[10px] font-medium tracking-[0.2em] uppercase
                       text-white/40 hover:text-white transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#acceso"
        className="btn-lime !py-[11px] !px-6 !text-[10px]
                   max-sm:!px-4 max-sm:!py-[10px] max-sm:!tracking-[0.12em]"
        onClick={() => track("ClickCTA", { source: "nav" })}
      >
        {BRAND.whatsappCta}
      </a>
    </motion.nav>
  );
}
