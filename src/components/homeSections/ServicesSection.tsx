"use client"

import { motion } from "framer-motion"
import { Check, Server } from "lucide-react"
import { SELECT_PACKAGE_EVENT, type PackageId } from "@/lib/site"

type Plan = {
    id: PackageId
    name: string
    price: string
    priceNote?: string
    tagline: string
    features: string[]
    forWho: string
    featured?: boolean
}

const plans: Plan[] = [
    {
        id: "start",
        name: "Start",
        price: "od 250 €",
        tagline: "Landing / prezentacija na jednoj stranici",
        features: [
            "Jedna stranica sa sekcijama (o nama, usluge, galerija, kontakt)",
            "Dizajn po meri, ne šablon",
            "Prilagođeno za mobilne telefone",
            "Osnovni SEO, Google mapa i kontakt forma",
            "Domen prve godine uključen",
            "Isporuka od 7 dana",
        ],
        forWho: "Za frizerske salone, majstore, kafiće i lokalne usluge",
    },
    {
        id: "biznis",
        name: "Biznis",
        price: "od 500 €",
        tagline: "Prezentacioni sajt sa više stranica",
        features: [
            "Do 6 stranica (početna, usluge, o nama, galerija, kontakt…)",
            "Dizajn po meri, ne šablon",
            "SEO podešavanje, Google Business profil i Analytics",
            "Izmene sadržaja radim ja — brzo i bez komplikacija",
            "Domen prve godine uključen",
            "Isporuka za 2–3 nedelje",
        ],
        forWho: "Za firme koje žele ozbiljno da se predstave i da ih nađu na Google-u",
        featured: true,
    },
    {
        id: "pro",
        name: "Pro",
        price: "od 800 €",
        priceNote: "tačna cena po dogovoru",
        tagline: "Online prodavnica ili aplikacija po meri",
        features: [
            "Shopify / headless prodavnica ili sistem po meri",
            "Online plaćanje, admin panel, korisnički nalozi po potrebi",
            "Panel u kome sami menjate sadržaj",
            "Zakazivanje, dashboard, baza podataka — šta vam treba",
            "Domen prve godine uključen",
            "Rok po dogovoru",
        ],
        forWho: "Za prodavnice, salone sa online zakazivanjem i interne poslovne alate",
    },
]

const maintenance = ["Hosting i domen", "SSL sertifikat", "Redovan backup", "Sitne izmene sadržaja", "Odgovor u roku od 24h"]

function selectPackage(id: PackageId) {
    window.dispatchEvent(new CustomEvent<PackageId>(SELECT_PACKAGE_EVENT, { detail: id }))
}

export default function ServicesSection() {
    return (
        <section id="usluge" className="py-20 px-[5vw]">
            <div className="max-w-6xl mx-auto flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                    <h2>Usluge i cene</h2>
                    <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
                        Jasne cene unapred, bez skrivenih troškova. U svaki paket su uključeni dizajn, izrada i postavljanje sajta na internet.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                            className={`relative bg-card rounded-xl p-6 flex flex-col gap-5 border ${
                                plan.featured ? "border-accent border-2 shadow-xl" : "border-card-border"
                            }`}
                        >
                            {plan.featured && (
                                <span className="absolute -top-3 left-6 text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-accent text-white">
                                    Najpopularnije
                                </span>
                            )}

                            <div className="flex flex-col gap-1">
                                <p className="font-semibold text-lg">{plan.name}</p>
                                <p className="text-sm text-muted">{plan.tagline}</p>
                            </div>

                            <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                                {plan.priceNote && <span className="text-sm text-muted">— {plan.priceNote}</span>}
                            </div>

                            <ul className="flex flex-col gap-2.5 text-sm">
                                {plan.features.map(f => (
                                    <li key={f} className="flex gap-2">
                                        <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-xs text-muted leading-relaxed mt-auto">{plan.forWho}</p>

                            <a
                                href="#kontakt"
                                onClick={() => selectPackage(plan.id)}
                                className={`inline-flex items-center justify-center text-sm font-medium uppercase tracking-wide py-2.5 px-4 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                                    plan.featured
                                        ? "border-accent bg-accent text-white hover:bg-accent-hover hover:border-accent-hover"
                                        : "border-foreground text-foreground hover:bg-foreground hover:text-background"
                                }`}
                            >
                                Zatražite ponudu
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Održavanje */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-card border border-card-border rounded-xl p-6 flex flex-col md:flex-row md:items-center gap-5"
                >
                    <div className="flex items-center gap-4 md:w-1/3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-accent/15">
                            <Server size={18} className="text-accent" />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold">Hosting i održavanje</p>
                            <p className="text-sm text-muted">
                                <span className="text-foreground font-semibold">od 20 €</span> mesečno
                            </p>
                        </div>
                    </div>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm flex-1">
                        {maintenance.map(m => (
                            <li key={m} className="inline-flex items-center gap-1.5">
                                <Check size={15} className="text-green-500 shrink-0" />
                                {m}
                            </li>
                        ))}
                    </ul>
                    <a
                        href="#kontakt"
                        onClick={() => selectPackage("odrzavanje")}
                        className="text-sm font-medium uppercase tracking-wide text-accent hover:underline shrink-0"
                    >
                        Saznajte više →
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
