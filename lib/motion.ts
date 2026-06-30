// ─── Shared Framer Motion variants ────────────────────────────────────────────
import type { Variants } from "framer-motion";

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const fadeUp = (delay = 0, distance = 44): Variants => ({
  hidden:  { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
  },
});

export const fadeIn = (delay = 0): Variants => ({
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO },
  },
});

export const scaleIn = (delay = 0): Variants => ({
  hidden:  { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, delay, ease: EASE_OUT_EXPO },
  },
});

export const staggerContainer = (staggerChildren = 0.1): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren } },
});

export const menuOverlay: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: EASE_OUT_EXPO } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

export const menuPanel: Variants = {
  hidden:  { x: "100%" },
  visible: { x: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
  exit:    { x: "100%", transition: { duration: 0.3, ease: EASE_OUT_EXPO } },
};
