"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { MessageCircle, Lightbulb, Code2, Rocket } from "lucide-react"

const steps = [
    {
        icon: MessageCircle,
        title: "Razgovor",
        description:
            "Saznajem šta vam treba — koji problem rešavam, šta je bitno i koji su rokovi. Nema pritiska, samo razgovor.",
        accent: "#6366f1",
    },
    {
        icon: Lightbulb,
        title: "Plan & Dizajn",
        description:
            "Definišem stranice i funkcionalnosti, pravim plan projekta i kreiram dizajn pre nego što se napiše i linija koda.",
        accent: "#06b6d4",
    },
    {
        icon: Code2,
        title: "Razvoj",
        description:
            "Kodiram sve što je dogovoreno. Redovno vas obaveštavamo o napretku i uzimam vaš feedback tokom rada.",
        accent: "#10b981",
    },
    {
        icon: Rocket,
        title: "Isporuka & Podrška",
        description:
            "Postavljam sajt na produkciju i ne nestajem — dostupan sam za izmene i podršku i nakon isporuke.",
        accent: "#f59e0b",
    },
]

interface StepProps {
    step: (typeof steps)[number]
    index: number
    isLast: boolean
}

function Step({ step, index, isLast }: StepProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })
    const Icon = step.icon

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -14 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className={`flex gap-5 relative ${isLast ? "" : "pb-10"}`}
        >
            {/* Icon dot */}
            <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.1, type: "spring", stiffness: 280 }}
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-20 relative"
                style={{
                    background: "var(--background)",
                    border: `2px solid ${step.accent}`,
                    boxShadow: `0 0 0 3px color-mix(in srgb, ${step.accent} 12%, transparent)`,
                }}
            >
                <Icon size={15} style={{ color: step.accent }} />
            </motion.div>

            {/* Content */}
            <div className="flex flex-col gap-1.5 pt-2">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted">0{index + 1}</span>
                    <span className="w-4 h-px bg-card-border" />
                    <p className="font-semibold text-base">{step.title}</p>
                </div>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
            </div>
        </motion.div>
    )
}

export default function ProcesRadaSection() {
    const sectionRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.7", "end 0.5"],
    })

    const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <section ref={sectionRef} className="py-20 px-[5vw]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Leva strana: naslov (sticky na desktopu) */}
                <div className="lg:sticky lg:top-32 flex flex-col gap-4">
                    <h2>Kako radim</h2>
                    <p className="text-muted text-base md:text-lg leading-relaxed">
                        Svaki projekat prolazi kroz iste korake — od prvog razgovora do podrške posle lansiranja.
                        Bez iznenađenja, sa jasnom komunikacijom u svakom koraku.
                    </p>
                </div>

                {/* Desna strana: animirana putanja */}
                <div className="relative">
                    {/* Statična pozadinska linija */}
                    <div
                        className="absolute w-px"
                        style={{
                            left: "19px",
                            top: "20px",
                            bottom: "20px",
                            background: "var(--card-border)",
                        }}
                    />

                    {/* Animirana accent linija */}
                    <motion.div
                        className="absolute w-px origin-top z-10"
                        style={{
                            left: "19px",
                            top: "20px",
                            bottom: "20px",
                            scaleY: lineScaleY,
                            background: "var(--accent)",
                        }}
                    />

                    {/* Koraci */}
                    <div className="flex flex-col relative z-20">
                        {steps.map((step, i) => (
                            <Step
                                key={step.title}
                                step={step}
                                index={i}
                                isLast={i === steps.length - 1}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}