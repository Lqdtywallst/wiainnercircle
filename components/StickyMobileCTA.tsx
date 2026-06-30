"use client";

import { WHATSAPP, whatsappUrl } from "@/lib/constants";
import { track } from "@/lib/tracking";

export default function StickyMobileCTA() {
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
