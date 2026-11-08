import Link from "next/link"
import { Mail, MessageCircle, Phone } from "lucide-react"
import { contact, navLinks, socials } from "@/lib/site"
import { GithubIcon, LinkedinIcon } from "./BrandIcons"
import { CookieSettingsButton } from "./CookieConsent"

const socialIcons = { LinkedIn: LinkedinIcon, GitHub: GithubIcon }


export default function Footer() {
    return (
        <footer className="mt-24 pt-12 pb-6 px-[5vw] border-t border-card-border bg-card">
            <div className="max-w-6xl mx-auto flex flex-col gap-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    {/* Logo & socials */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        <strong className="italic text-2xl tracking-tight">slavisadev</strong>
                        <div className="flex items-center gap-4">
                            {socials.map(s => {
                                const Icon = socialIcons[s.label]
                                return (
                                <a
                                    key={s.label}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="text-muted hover:text-accent transition-colors duration-200"
                                >
                                    <Icon size={20} />
                                </a>
                                )
                            })}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-sm text-muted">
                            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 hover:text-accent transition-colors duration-200">
                                <Mail size={16} /> {contact.email}
                            </a>
                            <a href={contact.phoneHref} className="inline-flex items-center gap-2 hover:text-accent transition-colors duration-200">
                                <Phone size={16} /> {contact.phoneDisplay}
                            </a>
                            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent transition-colors duration-200">
                                <MessageCircle size={16} /> WhatsApp
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
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                        <span>&copy; {new Date().getFullYear()} slavisadev — Sva prava zadržana</span>
                        <span className="hidden sm:inline">·</span>
                        <Link href="/politika-privatnosti" className="hover:text-accent transition-colors duration-200">
                            Politika privatnosti
                        </Link>
                        <span className="hidden sm:inline">·</span>
                        <CookieSettingsButton className="hover:text-accent transition-colors duration-200 cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    )
}