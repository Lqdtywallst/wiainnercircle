import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Aviso de Riesgo — WIA Inner Circle",
  description:
    "Disclaimer y aviso de riesgo asociado a la actividad de trading e inversiones.",
  robots: { index: true, follow: false },
};

export default function AvisoRiesgoPage() {
  return (
    <main>
      <Nav />
      <LegalPage
        eyebrow="Disclaimer"
        title="AVISO DE RIESGO"
        updated="28 junio 2026"
        sections={[
          {
            heading: "Naturaleza educativa",
            body: [
              `${BRAND.name} es una comunidad educativa y de formación entre pares. No somos una entidad regulada, no gestionamos capital de terceros y no proporcionamos asesoramiento financiero personalizado.`,
              "Todo el contenido tiene fines exclusivamente formativos e informativos.",
            ],
          },
          {
            heading: "Riesgo del trading y la inversión",
            body: [
              "El trading y la inversión en mercados financieros conllevan un riesgo elevado de pérdida y pueden no ser adecuados para todos los perfiles.",
              "El rendimiento pasado no garantiza resultados futuros. Existe la posibilidad real de perder parte o la totalidad del capital invertido.",
              "Antes de operar con capital real, debes evaluar tu situación financiera, tu experiencia y tu tolerancia al riesgo. Si tienes dudas, consulta con un asesor financiero independiente y debidamente regulado.",
            ],
          },
          {
            heading: "Ausencia de garantía de resultados",
            body: [
              "No prometemos ni garantizamos resultados económicos específicos para ningún miembro. Los testimonios mostrados son experiencias individuales y no representan resultados típicos.",
              "Tus resultados dependerán de tu disciplina, capital, decisiones y condiciones de mercado.",
            ],
          },
          {
            heading: "Responsabilidad del usuario",
            body: [
              "Al aplicar al Inner Circle reconoces haber leído y comprendido este aviso de riesgo y aceptas que cualquier decisión operativa o de inversión es de tu exclusiva responsabilidad.",
            ],
          },
        ]}
      />
      <Footer />
    </main>
  );
}
