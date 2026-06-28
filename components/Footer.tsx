"use client";

import { BRAND, LEGAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/[0.06] px-[52px] py-14
                       max-md:px-6 max-md:py-9 max-sm:px-[18px]">
      <div className="flex items-start justify-between flex-wrap gap-7
                      max-md:flex-col max-md:gap-7">
        <div>
          <a
            href="/"
            className="font-bebas text-[16px] tracking-[0.28em] text-white no-underline
                       max-sm:tracking-[0.22em]"
          >
            {BRAND.nameShort}
            <span className="text-lime ml-2">INNER CIRCLE</span>
          </a>
          <p className="font-inter text-[10px] tracking-[0.12em] text-white/22 mt-3
                        max-sm:leading-relaxed">
            © {year} {BRAND.parent} · Todos los derechos reservados
          </p>
        </div>

        <nav
          aria-label="Enlaces legales"
          className="flex flex-wrap items-center gap-x-7 gap-y-3 max-md:gap-x-5"
        >
          {LEGAL_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-inter text-[10px] font-medium tracking-[0.2em] uppercase
                         text-white/40 hover:text-white transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#acceso"
          className="font-inter text-[10px] font-medium tracking-[0.2em] uppercase
                     text-lime no-underline hover:opacity-70 transition-opacity"
        >
          Solicitar Acceso ↑
        </a>
      </div>

      <p className="font-inter text-[10px] font-light leading-[1.7] text-white/22
                    mt-9 max-w-[640px] max-sm:mt-7 max-sm:text-[9px]">
        El trading e inversión en mercados financieros conlleva riesgo de pérdida.
        Contenido con fines educativos. Resultados individuales no garantizados.
        Consulta el{" "}
        <a
          href="/legal/aviso-de-riesgo"
          className="underline underline-offset-2 hover:text-white transition-colors"
        >
          aviso de riesgo
        </a>{" "}
        completo.
      </p>
    </footer>
  );
}
