import { ChevronDown } from "lucide-react"

export const faqs = [
    {
        question: "Da li ja plaćam domen i hosting?",
        answer:
            "Domen (.rs ili .com) je prve godine uključen u cenu paketa. Nakon toga hosting, domen, SSL, backup i sitne izmene idu kroz održavanje od 20 € mesečno. Ako želite, sajt možete hostovati i sami — pomoći ću vam oko prebacivanja.",
    },
    {
        question: "Da li mogu sam da menjam tekst i slike?",
        answer:
            "Izmene na Start i Biznis sajtovima radim ja — pošaljete mi šta treba da se promeni i to brzo sređujem. Uz Pro paket dobijate i panel u kome sami menjate sadržaj.",
    },
    {
        question: "Šta ako mi se dizajn ne svidi?",
        answer:
            "Dizajn vidite pre nego što počnem sa kodiranjem. Uključena su 3 kruga izmena dizajna, a razvoj kreće tek kada ste zadovoljni.",
    },
    {
        question: "Šta vam treba od mene da počnemo?",
        answer:
            "Logo (ako ga imate), osnovne informacije o vašem biznisu i slike. Ako nemate tekstove — pomoći ću vam da ih sastavimo.",
    },
    {
        question: "Ko je vlasnik sajta i domena?",
        answer: "Vi. Domen se registruje na vaše ime, a sajt pripada vama i nakon isporuke.",
    },
    {
        question: "Da li radite redizajn postojećeg sajta?",
        answer:
            "Da. Pravim novi, brži i moderniji sajt, a zadržavam ono što je na starom radilo — sadržaj i pozicije na Google-u.",
    },
]

export default function FaqSection() {
    return (
        <section id="pitanja" className="py-20 px-[5vw]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
                <div className="lg:sticky lg:top-32 flex flex-col gap-4">
                    <h2>Česta pitanja</h2>
                    <p className="text-muted text-base md:text-lg leading-relaxed">
                        Niste našli odgovor? Pišite mi — odgovaram u roku od 24h.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {faqs.map(faq => (
                        <details
                            key={faq.question}
                            className="group bg-card border border-card-border rounded-xl px-5 open:pb-5"
                        >
                            <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-semibold [&::-webkit-details-marker]:hidden">
                                {faq.question}
                                <ChevronDown
                                    size={18}
                                    className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                                />
                            </summary>
                            <p className="text-sm md:text-base text-muted leading-relaxed">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}
