"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, BookOpen } from "lucide-react"
import Image from "next/image"

const projects = [
    {
        title: "Elaralabs",
        image: "/elaralabs_hero.png",
        url: "elaralabs.rs",
        caseStudyUrl: "/projekti/elaralabs",
        description: "Landing stranica za prirodno labelo sa 3D animacijama proizvoda i sekcijom za narudžbine.",
        tags: ["Next.js", "Drag & Drop", "Shopify"],
        accent: "#06b6d4",
    },
    {
        title: "Salon App",
        image: "/salonapp_termini.png",
        url: "slavisadev.com/salon",
        caseStudyUrl: "/projekti/salon-app",
        description: "Sistem za zakazivanje termina u frizerskom salonu sa kalendarom i upravljanjem slobodnim terminima.",
        tags: ["Django", "PostgreSQL", "VPS Hosting"],
        accent: "#10b981",
    },
    {
        title: "WMS Sistem",
        image: "/wms_dashboard.png",
        url: "slavisadev.com/wms",
        caseStudyUrl: "/projekti/wms-sistem",
        description: "WMS dashboard za upravljanje skladištem, inventarom, transportom i dokumentima.",
        tags: ["React.js", "Django", "PostgreSQL"],
        accent: "#6366f1",
    },
]

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
        <section ref={sectionRef} className="py-20 px-[5vw]">
            <div className="mx-auto flex flex-col gap-10">
                <h2>Projekti</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
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
                                        alt={project.title}
                                        fill
                                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
                            <div className="p-5 flex flex-col gap-3">
                                <div className="flex items-start justify-between gap-3">
                                    <p className="font-semibold text-base leading-snug">{project.title}</p>
                                    <div
                                        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                                        style={{ background: project.accent }}
                                    />
                                </div>
                                <p className="text-sm text-muted leading-relaxed">{project.description}</p>
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
                                <div className="flex gap-3 mt-2">
                                    <a
                                        href={`https://${project.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wide py-2 px-4 rounded-xl border-2 border-accent bg-accent text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        <ExternalLink size={13} />
                                        Live demo
                                    </a>
                                    <a
                                        href={project.caseStudyUrl}
                                        className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wide py-2 px-4 rounded-xl border-2 border-foreground text-foreground relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 before:absolute before:inset-0 before:bg-foreground before:origin-left before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:text-background"
                                    >
                                        <span className="relative z-10 inline-flex items-center gap-2">
                                            <BookOpen size={13} />
                                            Case study
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}