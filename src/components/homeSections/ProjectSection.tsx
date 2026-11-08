"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

type Project = {
    title: string
    kind: "Klijent" | "Školski projekat" | "Lični projekat"
    image: string
    url: string
    href: string
    caseStudyUrl?: string
    problem?: string
    description: string
    demoAccess?: { label: string; user: string; password: string }[]
    tags: string[]
    accent: string
    hidden?: boolean
}

const projects: Project[] = [
    {
        title: "Elaralabs",
        kind: "Klijent",
        image: "/elaralabs_hero.png",
        url: "elaralabs.rs",
        href: "https://elaralabs.rs",
        caseStudyUrl: "/projekti/elaralabs",
        problem: "Novom brendu je trebao sajt preko koga može da prodaje.",
        description: "Landing stranica sa 3D animacijama proizvoda i sekcijom za narudžbine.",
        tags: ["Next.js", "Drag & Drop", "Shopify"],
        accent: "#06b6d4",
    },
    {
        title: "Gvozdeni Zmaj",
        kind: "Klijent",
        image: "/gvozdenizmaj.png",
        url: "gvozdenizmaj.com",
        href: "https://gvozdenizmaj.com",
        caseStudyUrl: "/projekti/gvozdenizmaj",
        problem: "Strelište uopšte nije postojalo na internetu.",
        description: "Sajt sa rasporedom takmičenja, informacijama o opremi i kontaktom za rezervaciju termina.",
        tags: ["HTML", "CSS", "JavaScript"],
        accent: "#D7FF40",
    },
    {
        title: "Rio Sty1e",
        kind: "Klijent",
        image: "/rio.png",
        url: "riosty1e.com",
        href: "https://riosty1e.com",
        caseStudyUrl: "/projekti/riosty1e",
        problem: "Brend je prodavao samo preko Instagram poruka.",
        description: "Shopify prodavnica za trenerke, majice i kačkete sa custom dizajnom — narudžbine stižu same.",
        tags: ["Shopify"],
        accent: "#a1a1a1",
    },
    {
        title: "WMS Sistem",
        kind: "Školski projekat",
        image: "/wms_dashboard.png",
        url: "slavisadev.com/wms",
        href: "https://slavisadev.com/wms/",
        caseStudyUrl: "/projekti/wms-sistem",
        description: "Sistem za upravljanje skladištem, inventarom, transportom i dokumentima, sa posebnim ulogama za menadžere i zaposlene.",
        demoAccess: [
            { label: "Menadžer", user: "menadzertest", password: "SlavisaDev!11" },
            { label: "Zaposleni", user: "zaposlenitest", password: "SlavisaDev!11" },
        ],
        tags: ["React.js", "Django", "PostgreSQL"],
        accent: "#6366f1",
    },
    {
        // Sklonjeno iz portfolija dok se aplikacija ne sredi — skloni `hidden` da se vrati
        title: "Salon App",
        kind: "Lični projekat",
        image: "/salonapp_termini.png",
        url: "github.com/Slavisa05/salon_app",
        href: "https://github.com/Slavisa05/salon_app",
        caseStudyUrl: "/projekti/salon-app",
        description: "Sistem za zakazivanje termina u frizerskom salonu sa kalendarom i upravljanjem slobodnim terminima.",
        tags: ["Django", "PostgreSQL", "VPS Hosting"],
        accent: "#10b981",
        hidden: true,
    },
]

const visibleProjects = projects.filter(p => !p.hidden)

export default function ProjectSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="projekti" ref={sectionRef} className="py-20 px-[5vw]">
            <div className="mx-auto flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                    <h2>Projekti</h2>
                    <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
                        Sajtovi i prodavnice koje sam napravio za prave biznise — i sistemi koji pokazuju šta još mogu da izgradim.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visibleProjects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 32 }}
                            animate={visible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                            whileHover={{ y: -6 }}
                            className="group bg-card border border-card-border rounded-xl overflow-hidden flex flex-col"
                        >
                            {/* Browser chrome */}
                            <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-card-border bg-background shrink-0">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                <span className="ml-2 flex-1 h-5 rounded-sm text-[10px] text-muted flex items-center px-2 border border-card-border truncate">
                                    {project.url}
                                </span>
                            </div>

                            {/* Screenshot */}
                            <div className="relative w-full h-82 overflow-hidden">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={`${project.title} — snimak ekrana`}
                                        fill
                                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-end p-4"
                                        style={{ background: `${project.accent}22` }}
                                    >
                                        <span
                                            className="text-xs font-mono font-semibold uppercase tracking-widest"
                                            style={{ color: project.accent }}
                                        >
                                            {project.title}
                                        </span>
                                    </div>
                                )}
                                {/* Accent overlay on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                    style={{ background: project.accent }}
                                />
                            </div>

                            {/* Info */}
                            <div className="p-5 flex flex-col gap-3 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="font-semibold text-base leading-snug">{project.title}</p>
                                    <span
                                        className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border border-card-border text-muted shrink-0"
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ background: project.accent }}
                                        />
                                        {project.kind}
                                    </span>
                                </div>
                                {project.problem && (
                                    <p className="text-sm leading-relaxed">
                                        <span className="text-muted">Problem: </span>
                                        {project.problem}
                                    </p>
                                )}
                                <p className="text-sm text-muted leading-relaxed">
                                    {project.problem && <span>Rešenje: </span>}
                                    {project.description}
                                </p>
                                {project.demoAccess && (
                                    <div className="text-xs font-mono rounded-lg border border-card-border bg-background px-3 py-2.5 flex flex-col gap-1">
                                        <span className="font-sans font-semibold text-foreground">Demo pristup</span>
                                        {project.demoAccess.map(acc => (
                                            <span key={acc.user} className="text-muted">
                                                {acc.label}: <span className="text-foreground">{acc.user}</span> / <span className="text-foreground">{acc.password}</span>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {project.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full border border-card-border text-muted"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 mt-auto pt-2">
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wide py-2 px-4 rounded-xl border-2 border-accent bg-accent text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        <ExternalLink size={13} />
                                        {project.kind === "Klijent" ? "Pogledajte sajt" : "Live demo"}
                                    </a>
                                    {/* Case study dugme — vratiti (i import BookOpen) kad stranice budu gotove
                                    <a
                                        href={project.caseStudyUrl}
                                        className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wide py-2 px-4 rounded-xl border-2 border-foreground text-foreground relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 before:absolute before:inset-0 before:bg-foreground before:origin-left before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:text-background"
                                    >
                                        <span className="relative z-10 inline-flex items-center gap-2">
                                            <BookOpen size={13} />
                                            Case study
                                        </span>
                                    </a> */}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}