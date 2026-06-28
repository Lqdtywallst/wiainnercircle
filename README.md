# WIA Inner Circle — Landing Page

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion v11**

## Setup
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Project Structure
```
├── app/
│   ├── layout.tsx          # SEO metadata, fonts
│   ├── page.tsx            # Sections assembly
│   └── globals.css         # Base styles + Tailwind components
├── components/
│   ├── Nav.tsx             # Fixed nav
│   ├── Hero.tsx            # Split hero
│   ├── Results.tsx         # Bookmap + copy
│   ├── Statement.tsx       # Fullscreen parallax
│   ├── Gallery.tsx         # Photo grid
│   ├── Interstitial.tsx    # Lambo parallax
│   ├── Form.tsx            # Lead capture
│   └── Footer.tsx
├── lib/
│   ├── constants.ts        # ALL copy, image paths, colors ← edit here
│   └── motion.ts           # Shared Framer Motion variants
└── public/images/          # All photos (.jpeg)
```

## Editing copy or images
**Everything lives in `lib/constants.ts`** — change text, swap image paths, update stats from one file.

## Wiring the form
In `components/Form.tsx`, find the `handleSubmit` function:
```ts
// TODO: connect to your backend / WhatsApp API / Airtable / etc.
console.log("WIA Form submission:", form);
```
Replace with your API call (Webhook, Airtable, Formspree, WhatsApp Business API, etc.)

## Adding photos
1. Drop `.jpeg` into `/public/images/`
2. Add the path to `IMAGES` in `lib/constants.ts`
3. Reference it in the relevant component

## Brand
| Token | Value |
|---|---|
| Background | `#050505` |
| Lime / CTA | `#D6FF00` |
| Heading font | Bebas Neue |
| Body font | Inter |
