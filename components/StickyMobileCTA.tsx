"use client";

import { useEffect, useState } from "react";
import { WHATSAPP, whatsappUrl } from "@/lib/constants";
import { track } from "@/lib/tracking";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-dock md:hidden" role="region" aria-label="Acciones rápidas">
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="dock-whatsapp"
        onClick={() => track("ClickWhatsApp", { source: "sticky-dock" })}
      >
        {WHATSAPP.label}
      </a>
      <a
        href="#acceso"
        className="dock-form"
        onClick={() => track("ClickCTA", { source: "sticky-dock-form" })}
      >
        Aplicar
      </a>
    </div>
  );
}
