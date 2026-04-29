

"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Monitor, Server, Wrench } from "lucide-react"

const categories = [
    {
        title: "Frontend",
        icon: Monitor,
        accent: "#6366f1",
        techs: [
            { name: "Next.js",       color: "#94a3b8" },
            { name: "React.js",      color: "#61DAFB" },
            { name: "TypeScript",    color: "#3178C6" },
            { name: "Tailwind CSS",  color: "#06B6D4" },
            { name: "Framer Motion", color: "#a855f7" },
        ],
    },
    {
        title: "Backend",
        icon: Server,
        accent: "#10b981",
        techs: [
            { name: "Python",       color: "#f59e0b" },
            { name: "Django",       color: "#44b78b" },
            { name: "Django REST",  color: "#ef4444" },
            { name: "PostgreSQL",   color: "#336791" },
        ],
    },
    {
        title: "Alati",
        icon: Wrench,
        accent: "#f59e0b",
        techs: [
            { name: "Git",        color: "#F05032" },
            { name: "GitHub",     color: "#94a3b8" },
            { name: "Ubuntu VPS", color: "#E95420" },
            { name: "VS Code",    color: "#007ACC" },
        ],
    },
]

export default function StackSection() {
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
            { threshold: 0.15 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="py-10 px-[5vw]">
            <div className="mx-auto flex flex-col gap-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat, i) => {
                        const Icon = cat.icon
                        return (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 32 }}
                                animate={visible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                                className="bg-card border border-card-border rounded-xl p-6 flex flex-col gap-5"
                            >
                                {/* Card header */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: `${cat.accent}20` }}
                                    >
                                        <Icon size={17} style={{ color: cat.accent }} />
                                    </div>
                                    <span className="font-semibold text-base">{cat.title}</span>
                                    <div
                                        className="ml-auto h-px flex-1 rounded-full"
                                        style={{ background: `${cat.accent}35` }}
                                    />
                                </div>

                                {/* Tech badges */}
                                <div className="flex flex-wrap gap-2">
                                    {cat.techs.map(tech => (
                                        <span
                                            key={tech.name}
                                            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-card-border bg-background text-foreground"
                                        >
                                            <span
                                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                                style={{ background: tech.color }}
                                            />
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}