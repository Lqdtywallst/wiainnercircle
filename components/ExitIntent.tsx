"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { EXIT_INTENT, whatsappUrl } from "@/lib/constants";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { track } from "@/lib/tracking";

const STORAGE_KEY = "wia-exit-intent-shown";
const MOBILE_IDLE_MS = 25_000;
const SCROLL_THRESHOLD = 0.55;

export default function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [hasFired, setHasFired] = useState(false);

  const trigger = useCallback(
    (source: string) => {
      if (hasFired) return;
      if (typeof window === "undefined") return;
      if (sessionStorage.getItem(STORAGE_KEY)) return;

      sessionStorage.setItem(STORAGE_KEY, "1");
      setHasFired(true);
      setOpen(true);
      track("ExitIntent", { trigger: source });
    },
    [hasFired]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setHasFired(true);
      return;
    }

    // Desktop: detect mouse leaving toward the top (closing tab / back button)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger("desktop-mouseleave");
    };

    // Mobile fallback 1: deep scroll without conversion
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= SCROLL_THRESHOLD) {
        trigger("mobile-deep-scroll");
      }
    };

    // Mobile fallback 2: long idle
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const startIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => trigger("mobile-idle"), MOBILE_IDLE_MS);
    };

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    ["scroll", "click", "touchstart", "keydown"].forEach((evt) =>
      window.addEventListener(evt, startIdleTimer, { passive: true })
    );
    startIdleTimer();

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      ["scroll", "click", "touchstart", "keydown"].forEach((evt) =>
        window.removeEventListener(evt, startIdleTimer)
      );
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [trigger]);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="exit"
          role="dialog"
          aria-modal="true"
          aria-label={EXIT_INTENT.title}
          className="exit-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            className="exit-card"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            <button
              type="button"
              className="exit-close"
              onClick={close}
              aria-label="Cerrar"
            >
              ×
            </button>

            <p className="label mb-5">{EXIT_INTENT.eyebrow}</p>
            <h3 className="font-bebas text-[clamp(34px,4vw,52px)] leading-[0.95]
                           tracking-[0.04em] text-white mb-5">
              {EXIT_INTENT.title}
            </h3>
            <p className="font-inter text-[14px] font-light leading-[1.7]
                          text-white/55 mb-8 max-w-[400px] mx-auto">
              {EXIT_INTENT.body}
            </p>

            <a
              href={whatsappUrl(
                "Hola Santiago, vengo de la web de WIA Inner Circle y quiero hacerte una pregunta antes de aplicar."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime w-full text-center"
              onClick={() => {
                track("ClickWhatsApp", { source: "exit-intent" });
                close();
              }}
            >
              {EXIT_INTENT.cta}
            </a>

            <a
              href="#acceso"
              className="btn-ghost w-full justify-center mt-3"
              onClick={() => {
                track("ClickCTA", { source: "exit-intent-form" });
                close();
              }}
            >
              {EXIT_INTENT.formCta}
            </a>

            <button
              type="button"
              onClick={close}
              className="block mx-auto mt-5 font-inter text-[10px] tracking-[0.18em]
                         uppercase text-white/35 hover:text-white/70 transition-colors"
            >
              {EXIT_INTENT.dismiss}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
