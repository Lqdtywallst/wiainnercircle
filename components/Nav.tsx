"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { BRAND, FAVICONS, NAV_LINKS } from "@/lib/constants";
import { menuOverlay, menuPanel, staggerContainer, fadeUp } from "@/lib/motion";
import { track } from "@/lib/tracking";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 80],
    ["rgba(5,5,5,0)", "rgba(5,5,5,0.97)"]
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.06]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const handleNavClick = (label: string) => {
    closeMenu();
    track("ClickNav", { label });
  };

  const handleCtaClick = () => {
    closeMenu();
    track("ClickCTA", { source: "nav" });
  };

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
        className="relative z-[2] flex items-center gap-3 no-underline max-sm:gap-2"
        onClick={closeMenu}
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

      {/* Desktop CTA */}
      <a
        href="#acceso"
        className="btn-lime !py-[11px] !px-6 !text-[10px] max-md:hidden"
        onClick={() => track("ClickCTA", { source: "nav" })}
      >
        {BRAND.whatsappCta}
      </a>

      {/* Mobile menu toggle */}
      <button
        type="button"
        className="relative z-[2] flex h-10 w-10 items-center justify-center md:hidden"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="sr-only">{menuOpen ? "Cerrar menú" : "Abrir menú"}</span>
        <span className="relative block h-3 w-5">
          <span
            className={`absolute left-0 top-0 block h-px w-full bg-white transition-all duration-300 ${
              menuOpen ? "top-[5px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[5px] block h-px w-full bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[10px] block h-px w-full bg-white transition-all duration-300 ${
              menuOpen ? "top-[5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              variants={menuOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-label="Cerrar menú"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
            />

            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Navegación"
              variants={menuPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 flex w-full max-w-[320px] flex-col
                         border-l border-white/[0.06] bg-[#050505] px-8 pb-10 pt-24 md:hidden"
            >
              <motion.nav
                variants={staggerContainer(0.06)}
                initial="hidden"
                animate="visible"
                className="flex flex-1 flex-col gap-1"
              >
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    variants={fadeUp(0, 24)}
                    className="font-bebas py-3 text-[32px] leading-none tracking-[0.06em] text-white
                               transition-colors duration-200 hover:text-lime"
                    onClick={() => handleNavClick(label)}
                  >
                    {label}
                  </motion.a>
                ))}
              </motion.nav>

              <motion.a
                href="#acceso"
                variants={fadeUp(0.2, 20)}
                initial="hidden"
                animate="visible"
                className="btn-lime mt-8 w-full text-center !py-[16px] !text-[10px]"
                onClick={handleCtaClick}
              >
                {BRAND.whatsappCta}
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
