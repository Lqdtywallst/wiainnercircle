import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de Cookies — WIA Inner Circle",
  description:
    "Cómo usamos cookies y tecnologías similares en la web de WIA Inner Circle.",
  robots: { index: true, follow: false },
};

export default function CookiesPage() {
  return (
    <main>
      <Nav />
      <LegalPage
        eyebrow="Legal"
        title="POLÍTICA DE COOKIES"
        updated="28 junio 2026"
        sections={[
          {
            heading: "Qué son las cookies",
            body: [
              "Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando navegas. Permiten reconocerte y mejorar tu experiencia, además de medir cómo interactúas con la web.",
            ],
          },
          {
            heading: "Cookies que usamos",
            body: [
              "Técnicas: imprescindibles para el funcionamiento básico de la web. No requieren consentimiento.",
              "Analíticas: nos ayudan a entender qué secciones funcionan mejor (ej. Google Analytics 4, Microsoft Clarity).",
              "Publicitarias: nos permiten medir y optimizar nuestras campañas en Meta (Facebook/Instagram), TikTok y otras plataformas (Meta Pixel, TikTok Pixel).",
            ],
          },
          {
            heading: "Cómo gestionarlas",
            body: [
              "Puedes aceptar, rechazar o configurar tus preferencias en cualquier momento desde tu navegador. Bloquearlas puede afectar el correcto funcionamiento de algunas secciones.",
              "La mayoría de navegadores permiten gestionar cookies desde su menú de configuración.",
            ],
          },
          {
            heading: "Terceros",
            body: [
              "Los proveedores de cookies de terceros (Google, Meta, TikTok) tratan datos según sus propias políticas. Te recomendamos revisarlas si tienes dudas.",
            ],
          },
        ]}
      />
      <Footer />
    </main>
  );
}
