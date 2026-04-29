"use client"

import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
    { label: "o meni", href: "#o-meni" },
    { label: "projekti", href: "#projekti" },
    { label: "radi sa mnom", href: "#kontakt" },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Zatvori meni klikom van njega
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        if (open) document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    // Zatvori meni pri promjeni veličine ekrana
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 768) setOpen(false)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="fixed top-0 left-0 right-0 z-50 py-6 px-[5vw] flex flex-col items-center">
            {/* Glavna navbar traka */}
            <nav
                ref={menuRef}
                className="w-full md:max-w-[60vw] border-2 border-card-border shadow-xl flex items-center justify-between gap-3.5 p-4 md:p-5 rounded-xl"
                style={{ background: "var(--card)" }}
            >
                <Link href="/">
                    <strong className="italic text-2xl tracking-tight">slavisadev</strong>
                </Link>

                {/* Desktop linkovi */}
                <ul className="hidden md:flex items-center gap-4">
                    {navLinks.map(link => (
                        <li key={link.label}>
                            <Link
                                className="uppercase hover:text-accent transition-colors duration-200"
                                href={link.href}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <ThemeToggle />
                </ul>

                {/* Mobile: theme toggle + hamburger */}
                <div className="flex md:hidden items-center gap-2">
                    <ThemeToggle />

                    <button
                        onClick={() => setOpen(prev => !prev)}
                        className="p-2 rounded-lg border border-card-border bg-card text-foreground hover:bg-accent hover:text-white transition-colors duration-200 flex flex-col justify-center items-center w-9 h-9 gap-0"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                    >
                        <motion.span
                            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="block w-5 h-0.5 bg-current rounded-full origin-center"
                        />
                        <motion.span
                            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="block w-5 h-0.5 bg-current rounded-full mt-1.5"
                        />
                        <motion.span
                            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="block w-5 h-0.5 bg-current rounded-full origin-center mt-1.5"
                        />
                    </button>
                </div>

                {/* Mobile dropdown meni */}
                <AnimatePresence>
                    {open && (
                        <motion.ul
                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.97 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="absolute top-full left-[5vw] right-[5vw] mt-3 mx-0 md:hidden border-2 border-card-border rounded-xs overflow-hidden shadow-xl"
                            style={{ background: "var(--card)" }}
                        >
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.2 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="block uppercase px-6 py-4 hover:bg-accent hover:text-white transition-colors duration-200 border-b border-card-border last:border-b-0 font-medium tracking-wide"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    )
}