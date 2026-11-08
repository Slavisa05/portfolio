# slavisadev.com

Portfolio i sajt za izradu sajtova za male biznise: [slavisadev.com](https://slavisadev.com).

**Stack:** Next.js 16 (App Router, React Compiler), React 19, TypeScript, Tailwind CSS v4, Framer Motion, next-themes.

## Pokretanje

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build && npm start   # produkcija na portu 3001
```

### Env promenljive (`.env.local` lokalno, `.env` na serveru)

| Promenljiva | Opis |
|---|---|
| `BREVO_API_KEY` | API ključ iz Brevo → SMTP & API → API Keys. Koristi ga kontakt forma (`src/app/api/contact/route.ts`). |

Pošiljalac je `no-reply@slavisadev.com` (overen u Brevo-u). Ako Brevo vrati `401 unrecognised IP address`,
dodaj IP adresu VPS-a u Brevo → Security → Authorized IPs.

## Struktura

```
src/
├── app/
│   ├── (main)/page.tsx                  # početna (+ JSON-LD za Google)
│   ├── (main)/politika-privatnosti/     # politika privatnosti i kolačići
│   ├── api/contact/route.ts             # kontakt forma → Brevo (validacija, honeypot, rate limit)
│   ├── layout.tsx                       # metadata / SEO, navbar, footer, cookie baner
│   ├── sitemap.ts, robots.ts
├── components/
│   ├── homeSections/                    # Hero, Projekti, Usluge, Kako radim, O meni, FAQ, Kontakt
│   └── ui/                              # Navbar, Footer, Button, ThemeToggle, CookieConsent…
└── lib/
    ├── site.ts                          # kontakt podaci, navigacija, paketi (menjaju se SAMO ovde)
    └── consent.ts                       # pristanak za kolačiće (GA se učitava tek posle "Prihvatam")
```

### Česte izmene

- **Kontakt podaci / paketi u formi:** `src/lib/site.ts`
- **Cene i opis paketa:** `src/components/homeSections/ServicesSection.tsx`
- **Projekti:** niz `projects` u `ProjectSection.tsx` (`hidden: true` sakriva projekat)
- **FAQ:** niz `faqs` u `FaqSection.tsx` (automatski ide i u JSON-LD)
- **Utisci klijenata:** `TestimonialSection.tsx`, odkomentarisati u `(main)/page.tsx` kad stignu pravi

## Deploy

Svaki push na `main` pokreće `.github/workflows/deploy.yml`: SSH na VPS → `git pull` → `npm ci` → `npm run build` → `pm2 reload portfolio`.
