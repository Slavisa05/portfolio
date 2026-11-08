import type { Metadata } from "next"
import Link from "next/link"
import { contact } from "@/lib/site"
import { CookieSettingsButton } from "@/components/ui/CookieConsent"

export const metadata: Metadata = {
    title: "Politika privatnosti",
    description: "Kako slavisadev.com prikuplja, koristi i čuva vaše podatke i koje kolačiće koristi.",
    alternates: { canonical: "/politika-privatnosti" },
}

const LAST_UPDATED = "8. novembar 2026."

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="flex flex-col gap-3 scroll-mt-32">
            <h2 className="text-2xl! md:text-3xl!">{title}</h2>
            <div className="flex flex-col gap-3 text-muted leading-relaxed [&_strong]:text-foreground [&_a]:underline [&_a:hover]:text-accent [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
                {children}
            </div>
        </section>
    )
}

export default function PrivacyPolicyPage() {
    return (
        <main className="px-[5vw] pt-40 pb-10">
            <article className="max-w-3xl mx-auto flex flex-col gap-10">
                <header className="flex flex-col gap-3">
                    <h1 className="text-4xl! md:text-5xl!">Politika privatnosti</h1>
                    <p className="text-muted">Poslednja izmena: {LAST_UPDATED}</p>
                    <p className="text-muted leading-relaxed">
                        Ova politika objašnjava koje podatke prikuplja sajt <strong className="text-foreground">slavisadev.com</strong>,
                        zašto ih prikuplja i koja prava imate, u skladu sa Zakonom o zaštiti podataka o ličnosti
                        („Sl. glasnik RS“, br. 87/2018).
                    </p>
                </header>

                <Section title="1. Ko obrađuje vaše podatke">
                    <p>
                        Rukovalac podacima je <strong>Slaviša Arsenijević</strong>, fizičko lice, Ub, Srbija.
                        Za sva pitanja u vezi sa vašim podacima možete me kontaktirati na{" "}
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                    </p>
                </Section>

                <Section title="2. Koje podatke prikupljam">
                    <p>Kada pošaljete poruku preko kontakt forme, prikupljam:</p>
                    <ul>
                        <li>ime i prezime,</li>
                        <li>broj telefona,</li>
                        <li>email adresu (ako je unesete),</li>
                        <li>izabrani paket i sadržaj poruke.</li>
                    </ul>
                    <p>
                        Radi zaštite od zloupotrebe forme (spam), vaša IP adresa se privremeno koristi za ograničenje broja
                        poruka. Ona se ne upisuje u bazu i briše se iz memorije servera u roku od nekoliko minuta.
                    </p>
                    <p>
                        Ako prihvatite analitičke kolačiće, Google Analytics prikuplja anonimne podatke o korišćenju sajta
                        (koje stranice ste posetili, sa kog uređaja i odakle ste došli). Više u odeljku{" "}
                        <a href="#kolacici">Kolačići</a>.
                    </p>
                </Section>

                <Section title="3. Zašto koristim podatke">
                    <ul>
                        <li>da bih odgovorio na vaš upit i poslao vam ponudu,</li>
                        <li>da bih se dogovorio sa vama oko eventualne saradnje,</li>
                        <li>da bih razumeo kako se sajt koristi i unapredio ga (samo uz vaš pristanak na kolačiće).</li>
                    </ul>
                    <p>
                        Pravni osnov je preduzimanje radnji na vaš zahtev pre zaključenja ugovora (kontakt forma) i vaš
                        pristanak (analitički kolačići). Vaše podatke <strong>ne prodajem</strong>, ne koristim za reklame i ne šaljem
                        vam newsletter.
                    </p>
                </Section>

                <Section title="4. Ko još ima pristup podacima">
                    <p>Podaci se dele samo sa servisima neophodnim za rad sajta:</p>
                    <ul>
                        <li><strong>Brevo</strong> (Francuska, EU): servis preko kog se poruka iz forme šalje na moj email,</li>
                        <li><strong>Google</strong>: email sanduče u kome primam poruke i Google Analytics (samo uz pristanak),</li>
                        <li><strong>pružalac hostinga</strong>: server na kome se sajt nalazi.</li>
                    </ul>
                    <p>
                        Neki od ovih servisa mogu čuvati podatke van Srbije, uz mere zaštite koje propisuju njihovi uslovi
                        korišćenja i važeći propisi.
                    </p>
                </Section>

                <Section title="5. Koliko dugo čuvam podatke">
                    <p>
                        Poruke iz kontakt forme čuvam dok traje naša komunikacija. Ako ne dođe do saradnje, brišem ih
                        najkasnije <strong>12 meseci</strong> nakon poslednjeg kontakta. Ako sarađujemo, podatke čuvam koliko je
                        potrebno za realizaciju projekta i podršku nakon isporuke.
                    </p>
                </Section>

                <Section id="kolacici" title="6. Kolačići">
                    <p>Sajt koristi dve vrste podataka koji se čuvaju u vašem browseru:</p>
                    <ul>
                        <li>
                            <strong>Neophodni</strong> (ne traže pristanak): <code>theme</code> pamti da li ste izabrali svetlu ili
                            tamnu temu, a <code>cookie-consent</code> pamti vaš izbor oko kolačića. Oba se čuvaju u
                            localStorage-u vašeg browsera i ne šalju se nikome.
                        </li>
                        <li>
                            <strong>Analitički</strong> (samo uz pristanak): Google Analytics postavlja kolačiće <code>_ga</code> i{" "}
                            <code>_ga_*</code> koji traju do 2 godine i služe za anonimno merenje poseta.
                        </li>
                    </ul>
                    <p>
                        Google Analytics se ne učitava dok ne kliknete „Prihvatam“. Svoj izbor možete promeniti u bilo kom
                        trenutku:
                    </p>
                    <div>
                        <CookieSettingsButton className="inline-flex text-sm font-medium uppercase tracking-wide py-2 px-4 rounded-xl border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer" />
                    </div>
                </Section>

                <Section title="7. Vaša prava">
                    <p>U svakom trenutku imate pravo da:</p>
                    <ul>
                        <li>tražite uvid u podatke koje imam o vama,</li>
                        <li>tražite ispravku ili brisanje podataka,</li>
                        <li>tražite ograničenje obrade ili uložite prigovor,</li>
                        <li>povučete pristanak za kolačiće, bez uticaja na prethodnu obradu.</li>
                    </ul>
                    <p>
                        Zahtev pošaljite na <a href={`mailto:${contact.email}`}>{contact.email}</a> i odgovoriću vam u roku od
                        30 dana. Ako smatrate da su vaša prava povređena, možete podneti pritužbu{" "}
                        <a href="https://www.poverenik.rs" target="_blank" rel="noopener noreferrer">
                            Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti
                        </a>
                        .
                    </p>
                </Section>

                <Section title="8. Izmene politike">
                    <p>
                        Ako se ova politika promeni, nova verzija biće objavljena na ovoj stranici sa novim datumom izmene.
                    </p>
                </Section>

                <Link href="/" className="text-accent hover:underline self-start">← Nazad na početnu</Link>
            </article>
        </main>
    )
}
