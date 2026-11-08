"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import Button from "../ui/Button";
import { contact, packages, SELECT_PACKAGE_EVENT, type PackageId } from "@/lib/site";

const fieldVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

const inputClass =
    "w-full px-3 py-2 rounded-xl border border-card-border outline-none bg-background/70 text-foreground backdrop-blur-sm focus:border-accent transition-colors";

const directLinks = [
    { icon: MessageCircle, label: "WhatsApp", value: "Pišite mi na WhatsApp", href: contact.whatsappHref, external: true, color: "#25D366" },
    { icon: Phone, label: "Telefon", value: contact.phoneDisplay, href: contact.phoneHref, external: false, color: "var(--accent)" },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false, color: "var(--accent)" },
];

export default function ContactSection() {
    const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
    const [paket, setPaket] = useState<PackageId | "">("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Klik na "Zatražite ponudu" u sekciji Usluge unapred bira paket
    useEffect(() => {
        function onSelect(e: Event) {
            setPaket((e as CustomEvent<PackageId>).detail);
        }
        window.addEventListener(SELECT_PACKAGE_EVENT, onSelect);
        return () => window.removeEventListener(SELECT_PACKAGE_EVENT, onSelect);
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg(null);

        const form = e.currentTarget;
        const fd = new FormData(form);
        const data = {
            ime: fd.get("name"),
            telefon: fd.get("phoneNumber"),
            email: fd.get("email"),
            paket: packages.find(p => p.id === paket)?.label ?? "Nije izabrano",
            poruka: fd.get("message"),
            website: fd.get("website"), // honeypot
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                form.reset();
                setPaket("");
                setStatus("ok");
            } else {
                const json = await res.json().catch(() => null);
                setErrorMsg(typeof json?.error === "string" ? json.error : null);
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <section id="kontakt" className="px-[5vw] py-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                <motion.div
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col gap-4">
                        <h2>Imate projekat na umu?</h2>
                        <p className="text-muted text-base md:text-lg leading-relaxed">
                            Pošaljite mi poruku i odgovoriću vam u roku od 24h. Ponuda je besplatna i ne obavezuje vas ni na šta.
                        </p>
                    </div>

                    <ul className="flex flex-col gap-3">
                        {directLinks.map(link => {
                            const Icon = link.icon;
                            return (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                        className="flex items-center gap-4 bg-card border border-card-border rounded-xl px-4 py-3 hover:border-accent transition-colors"
                                    >
                                        <span
                                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                            style={{ background: `color-mix(in srgb, ${link.color} 15%, transparent)` }}
                                        >
                                            <Icon size={18} style={{ color: link.color }} />
                                        </span>
                                        <span className="flex flex-col">
                                            <span className="text-xs uppercase tracking-wider text-muted">{link.label}</span>
                                            <span className="font-medium">{link.value}</span>
                                        </span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Honeypot — skriveno od ljudi, botovi ga popune */}
                        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                            <label htmlFor="website">Website</label>
                            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                        </div>
                        {[
                            { label: "Ime i prezime", name: "name", type: "text", placeholder: "Marko Marković", autoComplete: "name", required: true },
                            { label: "Broj telefona", name: "phoneNumber", type: "tel", placeholder: "+381 64...", autoComplete: "tel", required: true },
                            { label: "Email (opciono)", name: "email", type: "email", placeholder: "marko@firma.rs", autoComplete: "email", required: false },
                        ].map((field, i) => (
                            <motion.div
                                key={field.name}
                                className="flex flex-col gap-1.5"
                                variants={fieldVariants}
                                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.12 }}
                            >
                                <label htmlFor={field.name}>{field.label}</label>
                                <input
                                    id={field.name}
                                    className={inputClass}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    autoComplete={field.autoComplete}
                                    required={field.required}
                                />
                            </motion.div>
                        ))}

                        <motion.div
                            className="flex flex-col gap-1.5"
                            variants={fieldVariants}
                            transition={{ duration: 0.45, ease: "easeOut", delay: 3 * 0.12 }}
                        >
                            <label htmlFor="paket">Šta vas zanima?</label>
                            <select
                                id="paket"
                                name="paket"
                                value={paket}
                                onChange={e => setPaket(e.target.value as PackageId | "")}
                                className={`${inputClass} cursor-pointer`}
                            >
                                <option value="">Izaberite paket…</option>
                                {packages.map(p => (
                                    <option key={p.id} value={p.id}>{p.label}</option>
                                ))}
                            </select>
                        </motion.div>

                        <motion.div
                            className="flex flex-col gap-1.5"
                            variants={fieldVariants}
                            transition={{ duration: 0.45, ease: "easeOut", delay: 4 * 0.12 }}
                        >
                            <label htmlFor="message">Poruka</label>
                            <textarea
                                id="message"
                                name="message"
                                className={`${inputClass} h-36 resize-none`}
                                placeholder="Zdravo, treba mi sajt za..."
                                required
                            />
                        </motion.div>

                        <motion.div variants={fieldVariants} transition={{ duration: 0.45, ease: "easeOut", delay: 5 * 0.12 }}>
                            <Button
                                type="submit"
                                text="Pošaljite upit"
                                variant="secondary"
                                isLoading={status === "loading"}
                                loadingText="Šalje se…"
                            />
                        </motion.div>

                        <p className="text-xs text-muted -mt-2">
                            Slanjem poruke prihvatate{" "}
                            <Link href="/politika-privatnosti" className="underline hover:text-accent">
                                politiku privatnosti
                            </Link>
                            . Vaše podatke koristim samo da bih vam odgovorio.
                        </p>

                        <p aria-live="polite" className="text-sm -mt-2">
                            {status === "ok" && <span className="text-green-500">Hvala! Poruka je poslata — javiću vam se u roku od 24h.</span>}
                            {status === "error" && (
                                <span className="text-red-500">
                                    {errorMsg ?? "Došlo je do greške."} Možete mi pisati i na WhatsApp.
                                </span>
                            )}
                        </p>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
