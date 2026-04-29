"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
    {
        name: "Marko Markovic",
        company: "Naziv Firme",
        url: "firmaweb.com",
        message:
            "Slaviša je isporučio tačno ono što smo tražili i to pre roka. Komunikacija je bila odlična tokom celog projekta — uvek dostupan i spreman da odgovori na pitanja. Sajt radi savršeno i klijenti su oduševljeni.",
    },
    {
        name: "Ime Prezime",
        company: "Naziv Firme",
        url: "firmaweb.rs",
        message:
            "Profesionalan pristup od prvog razgovora do isporuke. Dobili smo moderan sajt koji zaista donosi rezultate. Posebno cenim što nije nestao nakon završetka posla — i dalje je tu kad zatreba.",
    },
]

export default function TestimonialSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

    return (
        <section ref={sectionRef} className="py-20 px-[5vw]">
            <div className="max-w-6xl mx-auto flex flex-col gap-10">
                <h2>Šta kažu klijenti</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 28 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                            className="bg-card border border-card-border rounded-xl p-6 flex flex-col gap-5"
                        >
                            {/* Quote icon */}
                            <Quote size={22} className="text-accent opacity-60" />

                            {/* Message */}
                            <p className="text-base text-foreground leading-relaxed flex-1">
                                &ldquo;{t.message}&rdquo;
                            </p>

                            {/* Divider */}
                            <div className="h-px bg-card-border" />

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 text-accent font-semibold text-sm">
                                    {t.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm leading-tight">{t.name}</span>
                                    <span className="text-xs text-muted">{t.company} · {t.url}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
 