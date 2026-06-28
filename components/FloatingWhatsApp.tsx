"use client";

import { useEffect, useState } from "react";
import { WHATSAPP, whatsappUrl } from "@/lib/constants";
import { track } from "@/lib/tracking";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="float-wa hidden md:inline-flex"
      onClick={() => track("ClickWhatsApp", { source: "floating-desktop" })}
      aria-label={WHATSAPP.label}
    >
      <span className="float-wa-dot" aria-hidden />
      {WHATSAPP.label}
    </a>
  );
}
