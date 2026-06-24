import Link from "next/link"
import { Mail } from "lucide-react"

const navLinks = [
    { label: "o meni", href: "/#o-meni" },
    { label: "projekti", href: "/#projekti" },
    { label: "radi sa mnom", href: "/#kontakt" },
]

const socials = [
    { icon: Mail, url: "https://instagram.com/slavisadev", label: "Instagram" },
    { icon: Mail, url: "https://linkedin.com/in/slaviša-arsenijević-69b986316", label: "LinkedIn" },
    { icon: Mail, url: "https://github.com/Slavisa05", label: "GitHub" },
]

export default function Footer() {
    return (
        <footer className="mt-24 pt-12 pb-6 px-[5vw] border-t border-card-border bg-card">
            <div className="max-w-6xl mx-auto flex flex-col gap-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    {/* Logo & socials */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        <strong className="italic text-2xl tracking-tight">slavisadev</strong>
                        <div className="flex items-center gap-4">
                            {socials.map(s => (
                                <a
                                    key={s.label}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="text-muted hover:text-accent transition-colors duration-200"
                                >
                                    {s.label}
                                </a>
                            ))}
                            <a
                                href="mailto:slavisa@slavisadev.com"
                                className="text-muted hover:text-accent transition-colors duration-200 ml-2"
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Navigacija */}
                    <nav>
                        <ul className="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center">
                            {navLinks.map(link => (
                                <li key={link.label}>
                                    <Link
                                        className="uppercase text-sm hover:text-accent transition-colors duration-200"
                                        href={link.href}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Copyright */}
                <div className="text-xs text-muted text-center border-t border-card-border pt-6">
                    &copy; {new Date().getFullYear()} slavisadev — Sva prava zadržana
                </div>
            </div>
        </footer>
    )
}