"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    url: string
    image?: string
    accent?: string
    index?: number
}

export default function ProjectCard({
    title,
    description,
    tags,
    url,
    image,
    accent = "#6366f1",
    index = 0,
}: ProjectCardProps) {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 1.2,
            }}
            className="w-72 rounded-xl border border-card-border overflow-hidden shadow-2xl"
            style={{ background: "var(--card)" }}
        >
            {/* Browser chrome */}
            <div
                className="flex items-center gap-1.5 px-3 py-2.5 border-b border-card-border"
                style={{ background: "var(--background)" }}
            >
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-2 flex-1 h-4 rounded-sm text-[10px] text-muted flex items-center px-2 border border-card-border truncate">
                    {url}
                </span>
            </div>

            {/* Screenshot / placeholder */}
            <div className="relative w-full h-44 overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover object-top"
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-end p-4"
                        style={{ background: `${accent}22` }}
                    >
                        <span
                            className="text-xs font-mono font-semibold uppercase tracking-widest"
                            style={{ color: accent }}
                        >
                            {title}
                        </span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-2">
                <p className="font-semibold text-sm leading-snug">{title}</p>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{description}</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border border-card-border text-muted"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
