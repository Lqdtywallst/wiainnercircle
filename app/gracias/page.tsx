import { Suspense } from "react";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThankYou from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Solicitud recibida — WIA Inner Circle",
  description:
    "Tu aplicación al WIA Inner Circle está en revisión. Si encajas, te escribimos en minutos en horario activo.",
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <main>
      <Nav />
      <Suspense fallback={null}>
        <ThankYou />
      </Suspense>
      <Footer />
    </main>
  );
}
