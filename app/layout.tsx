import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ANALYTICS, FAVICONS } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: "WIA Inner Circle — Tu Siguiente Nivel Empieza Aquí",
  description:
    "Comunidad privada de élite para emprendedores y traders que buscan escalar negocios, dominar el trading con Order Flow institucional y construir libertad financiera real. Solicita acceso.",
  keywords:
    "WIA Inner Circle, trading, negocios, inversiones, mentalidad, Order Flow, comunidad privada, Dubai, World Institutional Assets",
  authors: [{ name: "World Institutional Assets" }],
  icons: {
    icon: [
      { url: FAVICONS.svg, type: "image/svg+xml" },
      { url: FAVICONS.png32, sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: FAVICONS.png192, sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    title: "WIA Inner Circle — Tu Siguiente Nivel Empieza Aquí",
    description:
      "Únete a la comunidad privada de traders y emprendedores de alto rendimiento.",
    type: "website",
    locale: "es_ES",
    images: [{ url: FAVICONS.png512, width: 512, height: 512, alt: "WIA Inner Circle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WIA Inner Circle",
    description: "Comunidad privada. Trading. Negocios. Libertad.",
    images: [FAVICONS.png512],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { metaPixelId, ga4Id, tiktokPixelId } = ANALYTICS;

  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-[#050505] text-white antialiased overflow-x-hidden">
        {children}

        {metaPixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
                n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
                s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
                (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}

        {ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}');
              `}
            </Script>
          </>
        )}

        {tiktokPixelId && (
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${tiktokPixelId}');
                ttq.page();
              }(window, document, 'ttq');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
