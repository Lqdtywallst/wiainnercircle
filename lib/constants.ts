// ─── Brand ────────────────────────────────────────────────────────────────────
export const BRAND = {
  name: "WIA Inner Circle",
  nameShort: "WIA",
  tagline: "Tu Siguiente Nivel Empieza Aquí.",
  parent: "World Institutional Assets",
  instagram: "@lqdtywallst",
  whatsappCta: "Solicitar Acceso",
} as const;

// ─── Contact ──────────────────────────────────────────────────────────────────
// Replace WHATSAPP.number with your real WhatsApp number in international format
// (digits only, no spaces, no +). Example: "971501234567"
export const WHATSAPP = {
  number: "971586122568",
  label: "Hablar por WhatsApp",
  message:
    "Hola Santiago, vengo de la web de WIA Inner Circle y quiero aplicar a la comunidad.",
} as const;

export const whatsappUrl = (extraMessage?: string) =>
  `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(
    extraMessage ?? WHATSAPP.message
  )}`;

// ─── Analytics (set in Vercel / .env.local as NEXT_PUBLIC_*) ────────────────
export const ANALYTICS = {
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "",
};

// ─── Telegram community (public invite link, not boost link) ──────────────────
export const TELEGRAM_COMMUNITY = {
  url: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "",
  label: "Canal privado en Telegram",
  cta: "Unirme al canal",
};

// ─── Colors ───────────────────────────────────────────────────────────────────
export const COLORS = {
  bg: "#050505",
  lime: "#D6FF00",
  white: "#ffffff",
  dimText: "rgba(255,255,255,0.45)",
  subtleText: "rgba(255,255,255,0.22)",
  border: "rgba(214,255,0,0.22)",
  borderFocus: "rgba(214,255,0,0.7)",
} as const;

// ─── Images (all in /public/images/) ──────────────────────────────────────────
export const IMAGES = {
  hero:         "/images/hero.jpeg",
  bookmap:      "/images/bookmap.jpeg",
  steeringWheel:"/images/steering-wheel.jpeg",
  gwagon:       "/images/gwagon.jpeg",
  urus:         "/images/urus.jpeg",
  lamboSto:     "/images/lambo-sto.jpeg",
  deskDay:      "/images/desk-day.jpeg",
  lamboDay:     "/images/lambo-day.jpeg",
  lamboNight:   "/images/lambo-night.jpeg",
  santiago:     "/images/santiago.jpeg",
  santiagoCutout: "/images/santiago-cutout.png",
} as const;

// ─── Videos (all in /public/videos/) ──────────────────────────────────────────
export const VIDEOS = {
  lamboDay: {
    src:    "/videos/lambo-day.mp4",
    poster: "/videos/lambo-day-poster.jpg",
  },
} as const;

// ─── Site URL (used for absolute OG / social images) ──────────────────────────
// En Vercel se sobreescribe con NEXT_PUBLIC_SITE_URL (con o sin https).
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
      return new URL(withProtocol).origin;
    } catch {
      // ignore invalid env value
    }
  }
  return "https://wiainnercircle.vercel.app";
}

export const SITE_URL = resolveSiteUrl();

// ─── Favicons (all in /public/) ───────────────────────────────────────────────
export const FAVICONS = {
  svg:   "/wia-inner-circle-favicon.svg",
  png32: "/wia-inner-circle-favicon-32.png",
  png192:"/wia-inner-circle-favicon-192.png",
  png512:"/wia-inner-circle-favicon-512.png",
  og:    "/wia-inner-circle-og.jpg",
} as const;

// ─── Nav links ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Método",     href: "#resultados" },
  { label: "Dentro",     href: "#dentro" },
  { label: "Comunidad",  href: "#testimonios" },
  { label: "FAQ",        href: "#faq" },
  { label: "Acceso",     href: "#acceso" },
] as const;

// ─── Disciplines (hero tags) ──────────────────────────────────────────────────
export const DISCIPLINES = ["Negocios", "Trading", "Inversiones", "Mentalidad"] as const;

// ─── Stats ────────────────────────────────────────────────────────────────────
export const STATS = [
  { value: "Order Flow", label: "Metodología" },
  { value: "Real",       label: "Gestión de capital real" },
  { value: "Privado",    label: "Acceso exclusivo" },
] as const;

// ─── Value stack — qué encuentras dentro ──────────────────────────────────────
export const VALUE_STACK = [
  {
    title: "Sala de Trading en Vivo",
    body:
      "Sesiones diarias operando Order Flow real en mercados líquidos. Sin teoría barata.",
  },
  {
    title: "Mentoría Directa",
    body:
      "Acceso al núcleo de la comunidad y resolución de dudas en tiempo real, no en un foro muerto.",
  },
  {
    title: "Networking Dubai",
    body:
      "Conectas con traders, founders e inversores que mueven capital de verdad.",
  },
  {
    title: "Estrategia de Negocio",
    body:
      "Frameworks para escalar tu negocio o construir uno desde cero con foco en cashflow.",
  },
  {
    title: "Mindset de Alto Rendimiento",
    body:
      "Disciplina, gestión del riesgo y enfoque. La parte que casi nadie entrena.",
  },
  {
    title: "Recursos & Plantillas",
    body:
      "Setups, journaling, gestión de portfolio y checklists usados a diario por miembros.",
  },
] as const;

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    quote:
      "Pasé de operar sin método a tener un plan claro y resultados consistentes en 3 meses.",
    name: "Diego R.",
    role: "Trader · Madrid",
  },
  {
    quote:
      "El nivel de la gente dentro es otro deporte. Conexiones que valen más que cualquier curso.",
    name: "Lucía M.",
    role: "Founder SaaS · CDMX",
  },
  {
    quote:
      "Por fin una comunidad donde se habla de capital real, no de promesas vacías.",
    name: "Andrés P.",
    role: "Inversor · Bogotá",
  },
  {
    quote:
      "Apliqué un solo framework y subí el margen de mi negocio un 40% en un trimestre.",
    name: "Iván S.",
    role: "Emprendedor · Buenos Aires",
  },
] as const;

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ = [
  {
    q: "¿A quién está dirigido el Inner Circle?",
    a: "A emprendedores, traders e inversores que ya están en movimiento y quieren un entorno serio para acelerar. No es para curiosos ni para quien busca atajos.",
  },
  {
    q: "¿Necesito experiencia previa en trading?",
    a: "No hace falta ser experto, pero sí tener disciplina y compromiso. Dentro encontrarás formación de Order Flow desde la base hasta nivel avanzado.",
  },
  {
    q: "¿Cuánto cuesta entrar?",
    a: "La inversión se comunica solo a candidatos aceptados. Filtramos primero el perfil para asegurar el nivel de la comunidad.",
  },
  {
    q: "¿Cuánto tiempo necesito dedicarle?",
    a: "Recomendamos mínimo 5 horas semanales. La comunidad está diseñada para personas ocupadas que valoran su tiempo.",
  },
  {
    q: "¿Hay garantía o devolución?",
    a: "No. El acceso es por aplicación filtrada precisamente para evitar que necesites pensar en una devolución. Si entras, es porque encajas.",
  },
  {
    q: "¿En qué se diferencia de otros cursos o señales?",
    a: "No vendemos cursos ni señales. Es una comunidad cerrada con mentoría directa, capital real en juego y networking de alto nivel desde Dubai.",
  },
] as const;

// ─── Urgency ──────────────────────────────────────────────────────────────────
export const URGENCY = {
  banner: "Plazas limitadas este mes · Cerramos al alcanzar el cupo",
  formNote: "30 segundos · Te contactamos en menos de 24h si encajas",
  spotsLeft: "Quedan pocas plazas",
} as const;

// ─── Form fields ──────────────────────────────────────────────────────────────
export const INCOME_OPTIONS = [
  { value: "",       label: "Selecciona un rango" },
  { value: "0-2k",   label: "Menos de $2,000 / mes" },
  { value: "2k-5k",  label: "$2,000 – $5,000 / mes" },
  { value: "5k-10k", label: "$5,000 – $10,000 / mes" },
  { value: "10k-25k",label: "$10,000 – $25,000 / mes" },
  { value: "25k+",   label: "Más de $25,000 / mes" },
] as const;

// ─── Mini CTA copy (used between sections) ────────────────────────────────────
export const MICRO_CTAS = {
  results:   "Quiero entrar a la comunidad",
  statement: "Aplicar al Inner Circle",
  gallery:   "Solicitar mi plaza",
  faq:       "Ya lo tengo claro · Aplicar",
} as const;

// ─── Founder bio (edit with real credentials when possible) ───────────────────
export const FOUNDER = {
  name: "Santiago",
  role: "Fundador & Empresario",
  city: "Dubai, EAU",
  image: "/images/santiago-cutout.png",
  // Authority badges shown right below the heading
  badges: [
    "Asesor financiero regulado",
  ],
  // Edit / añade tus credenciales reales aquí ↓
  credentials: [
    "Asesor financiero regulado",
    "Empresario con varias compañías en operación",
    "Trader profesional · metodología Order Flow desde Dubai",
  ],
  intro:
    "Santiago es asesor financiero regulado, trader profesional y dirige varias empresas desde Dubai. Combina trading, tecnología y negocios, y construye WIA Inner Circle como el entorno que él hubiera querido tener cuando empezó.",
} as const;

// ─── Exit intent message ──────────────────────────────────────────────────────
export const EXIT_INTENT = {
  eyebrow: "Antes de irte",
  title: "Sin compromiso. Sin formulario.",
  body:
    "Escríbenos un WhatsApp y te decimos en 5 minutos si el Inner Circle encaja contigo.",
  cta: "Hablar ahora por WhatsApp",
  dismiss: "Continuar en la web",
} as const;

// ─── Thank you page ───────────────────────────────────────────────────────────
export const THANK_YOU = {
  eyebrow: "Solicitud recibida",
  title: "Bienvenido al primer filtro.",
  body:
    "Tu aplicación está en cola. Si encajas, te contactamos en menos de 24 horas. Reserva tu llamada ahora para acelerar el proceso.",
  steps: [
    {
      label: "01",
      title: "Revisamos tu perfil",
      body: "Validamos que encajas con el nivel de la comunidad.",
    },
    {
      label: "02",
      title: "Llamada breve",
      body: "15 minutos por video para conocernos y aclarar dudas.",
    },
    {
      label: "03",
      title: "Acceso al Inner Circle",
      body: "Si hay match, recibes credenciales y onboarding personalizado.",
    },
  ],
  // Calendly embed URL → NEXT_PUBLIC_CALENDLY_URL en Vercel (ej. https://calendly.com/tu-usuario/15min?hide_gdpr_banner=1)
  calendarUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  calendarTitle: "Reserva tu llamada de calificación",
  calendarNote: "30 min · Sin compromiso · Confirma tu plaza",
  whatsappPrompt: "Quiero acelerar la conversación",
} as const;

// ─── Legal pages ──────────────────────────────────────────────────────────────
export const LEGAL_LINKS = [
  { label: "Privacidad",   href: "/legal/privacidad" },
  { label: "Cookies",      href: "/legal/cookies" },
  { label: "Aviso de riesgo", href: "/legal/aviso-de-riesgo" },
] as const;
