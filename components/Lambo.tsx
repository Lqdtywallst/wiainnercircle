"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Lambo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} style={{
      position: "relative", height: "70vh", overflow: "hidden",
      display: "flex", alignItems: "flex-end", padding: "60px 52px",
    }}>
      <motion.div style={{ y, position: "absolute", inset: "-10%", zIndex: 0 }}>
        <img src="/images/lambo-day.jpeg" alt="Lamborghini Huracán STO Dubai"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
      </motion.div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.45)", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
        background: "linear-gradient(to top, #050505, transparent)", zIndex: 2 }} />
      <motion.div style={{ position: "relative", zIndex: 3 }}
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500,
          letterSpacing: "0.3em", color: "#D6FF00", textTransform: "uppercase", marginBottom: "14px" }}>
          Dubai · 2024
        </p>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 3vw, 44px)",
          letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)" }}>
          Lamborghini Huracán STO
        </p>
      </motion.div>
    </section>
  );
}
