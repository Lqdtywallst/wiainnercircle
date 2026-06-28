import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidad — WIA Inner Circle",
  description:
    "Cómo recogemos, usamos y protegemos tus datos personales en WIA Inner Circle.",
  robots: { index: true, follow: false },
};

export default function PrivacidadPage() {
  return (
    <main>
      <Nav />
      <LegalPage
        eyebrow="Legal"
        title="POLÍTICA DE PRIVACIDAD"
        updated="28 junio 2026"
        sections={[
          {
            heading: "Responsable",
            body: [
              `${BRAND.parent} ("nosotros", "el responsable") opera la web y la comunidad ${BRAND.name} desde Dubai, Emiratos Árabes Unidos.`,
              `Si tienes cualquier duda sobre el tratamiento de tus datos, escríbenos por los canales indicados en esta web.`,
            ],
          },
          {
            heading: "Qué datos recogemos",
            body: [
              "Cuando rellenas el formulario de aplicación recogemos: nombre, WhatsApp, email, ocupación, rango de ingresos y objetivo declarado.",
              "También recogemos datos técnicos anónimos de navegación (páginas vistas, dispositivo, fuente de tráfico) mediante herramientas analíticas y píxeles publicitarios.",
            ],
          },
          {
            heading: "Para qué los usamos",
            body: [
              "Para evaluar tu candidatura al Inner Circle, contactarte por WhatsApp o email y comunicarte información relacionada con la comunidad.",
              "Para medir el rendimiento de la web y optimizar nuestras campañas publicitarias.",
              "No vendemos tus datos a terceros bajo ningún concepto.",
            ],
          },
          {
            heading: "Tus derechos",
            body: [
              "Puedes solicitar en cualquier momento acceso, rectificación, supresión, oposición o portabilidad de tus datos escribiéndonos por WhatsApp o email.",
              "Atenderemos tu solicitud en un plazo máximo de 30 días.",
            ],
          },
          {
            heading: "Conservación",
            body: [
              "Conservamos tus datos mientras exista relación con la comunidad o un interés legítimo. Si solicitas la supresión los eliminaremos salvo obligación legal de conservación.",
            ],
          },
          {
            heading: "Seguridad",
            body: [
              "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos. Ninguna transmisión por internet es 100% segura, por lo que no podemos garantizar protección absoluta.",
            ],
          },
        ]}
      />
      <Footer />
    </main>
  );
}
