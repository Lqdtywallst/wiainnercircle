import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Results from "@/components/Results";
import ValueStack from "@/components/ValueStack";
import Pricing from "@/components/Pricing";
import Checkout from "@/components/Checkout";
import Statement from "@/components/Statement";
import Founder from "@/components/Founder";
import LeadCapture from "@/components/LeadCapture";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Interstitial from "@/components/Interstitial";
import FAQ from "@/components/FAQ";
import Form from "@/components/Form";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ExitIntent from "@/components/ExitIntent";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Results />
      <ValueStack />
      <Pricing />
      <Checkout />
      <Statement />
      <Founder />
      <LeadCapture />
      <Testimonials />
      <Gallery />
      <Interstitial />
      <FAQ />
      <Form />
      <Footer />
      <StickyMobileCTA />
      <FloatingWhatsApp />
      <ExitIntent />
    </main>
  );
}
