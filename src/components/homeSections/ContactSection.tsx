"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../ui/Button";

const fieldVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

export default function ContactSection() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = {
        ime: (form.elements.namedItem('name') as HTMLInputElement).value,
        telefon: (form.elements.namedItem('phoneNumber') as HTMLInputElement).value,
        poruka: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    setStatus(res.ok ? 'ok' : 'error')
    }

    return(
        <section id="kontakt" className="mx-[5vw] py-10">
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Levi tekst — slide s leva */}
                <motion.div
                    className="flex flex-col justify-center gap-4"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h2>Imate projekat na umu?</h2>
                    <p className="text-muted">Pošaljite nam poruku i odgovoriću vam u najkraćem mogućem roku</p>
                </motion.div>

                {/* Forma — polja se pojavljuju jedno po jedno */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {[
                            { label: "Ime i prezime", name: "name", type: "text", placeholder: "Marko Marković", tag: "input", autocomplete: "name" },
                            { label: "Broj telefona", name: "phoneNumber", type: "tel", placeholder: "+38164...", tag: "input", autocomplete: "tel" },
                            { label: "Poruka", name: "message", type: "text", placeholder: "Zdravo, treba mi sajt za...", tag: "textarea", autocomplete: "off" },
                        ].map((field, i) => (
                            <motion.div
                                key={field.name}
                                className="flex flex-col gap-1.5"
                                variants={fieldVariants}
                                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.15 }}
                            >
                                <label htmlFor={field.name}>{field.label}</label>
                                {field.tag === "textarea" ? (
                                    <textarea
                                        id={field.name}
                                        className="h-40 px-3 py-2 rounded-xl border outline-none bg-background/70 text-foreground resize-none backdrop-blur-sm"
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        autoComplete={field.autocomplete}
                                    />
                                ) : (
                                    <input
                                        id={field.name}
                                        className="px-3 py-2 rounded-xl border outline-none bg-background/70 text-foreground backdrop-blur-sm"
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        autoComplete={field.autocomplete}
                                    />
                                )}
                            </motion.div>
                        ))}

                        <motion.div variants={fieldVariants} transition={{ duration: 0.45, ease: "easeOut", delay: 3 * 0.15 }}>
                            <Button type="submit" text="Pošalji poruku" variant="secondary" />
                        </motion.div>

                        {status === 'ok' && <p className="text-green-500 text-sm">Poruka poslata!</p>}
                        {status === 'error' && <p className="text-red-500 text-sm">Greška, pokušaj ponovo.</p>}
                    </form>
                </motion.div>
            </div>
        </section>
    )
}