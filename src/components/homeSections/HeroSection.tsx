import Link from "next/link";
import { Check } from "lucide-react";
import Button from "../ui/Button";
import ProjectCard from "../ui/ProjectCard";

const facts = ["Sajt od 250 €", "Isporuka od 7 dana", "Odgovor u roku od 24h"];

const heroCards = {
    gvozdenizmaj: {
        title: "Gvozdeni Zmaj",
        image: "/gvozdenizmaj.png",
        url: "gvozdenizmaj.com",
        description: "Sajt za strelište sa rasporedom takmičenja, opremom i kontaktom za rezervaciju termina.",
        tags: ["HTML", "CSS", "JavaScript"],
        accent: "#D7FF40",
    },
    elaralabs: {
        title: "Elaralabs",
        image: "/elaralabs_hero.png",
        url: "elaralabs.rs",
        description: "Landing stranica za novi brend sa 3D animacijama proizvoda i sekcijom za narudžbine.",
        tags: ["Next.js", "Shopify"],
        accent: "#06b6d4",
    },
    rio: {
        title: "Rio Sty1e",
        image: "/rio.png",
        url: "riosty1e.com",
        description: "Online prodavnica za streetwear brend koji je ranije prodavao samo preko Instagrama.",
        tags: ["Shopify"],
        accent: "#a1a1a1",
    },
};

export default function HeroSection() {
    return (
        <section className="min-h-screen w-full px-[5vw] pt-35 pb-16 flex">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
                <div className="flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 self-start border border-card-border bg-card text-muted text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        Dostupan za nove projekte
                    </div>

                    <h1>Sajtovi koji rade za vaš biznis</h1>

                    <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl">
                        Pravim moderne sajtove i online prodavnice za male biznise u Srbiji — od dizajna do hostinga.
                        Radite direktno sa mnom, bez agencije i skrivenih troškova.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <Link href="/#kontakt">
                            <Button text="Zatražite besplatnu ponudu" />
                        </Link>
                        <Link href="/#projekti">
                            <Button text="Pogledajte projekte" variant="secondary" />
                        </Link>
                    </div>

                    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                        {facts.map(fact => (
                            <li key={fact} className="inline-flex items-center gap-1.5">
                                <Check size={15} className="text-green-500 shrink-0" />
                                {fact}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Desktop: tri kartice jedna preko druge */}
                <div className="hidden md:flex items-center justify-center relative h-130">
                    <div className="absolute top-16 left-4 -rotate-6 z-10">
                        <ProjectCard {...heroCards.gvozdenizmaj} index={0} />
                    </div>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 rotate-2 z-20">
                        <ProjectCard {...heroCards.elaralabs} index={1} />
                    </div>
                    <div className="absolute top-24 right-0 -rotate-3 z-10">
                        <ProjectCard {...heroCards.rio} index={2} />
                    </div>
                </div>

                {/* Mobilni: jedna kartica, bez preklapanja */}
                <div className="flex md:hidden justify-center">
                    <ProjectCard {...heroCards.elaralabs} index={0} />
                </div>
            </div>
        </section>
    );
}
