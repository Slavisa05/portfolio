"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const PHOTO: string | null = "/slavisa.jpeg";

const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Django", "PostgreSQL", "Shopify"];

const full = `const o_meni = {
  ime: "Slaviša Arsenijević",
  uloga: "Web developer",
  lokacija: "Ub (kod Beograda)",
  saradnja: "online ili uživo",
  odgovor: "do 24h",
  dostupan: true,
}`;

export default function AboutSection() {
    const [text, setText] = useState("");
    const [started, setStarted] = useState(false);
    const [done, setDone] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    // Bez kucanja ako korisnik ima uključeno "smanji animacije"
                    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                        setText(full);
                        setDone(true);
                        return;
                    }
                    setStarted(true);
                }
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const iv = setInterval(() => {
            i++;
            setText(full.slice(0, i));
            if (i >= full.length) {
                clearInterval(iv);
                setDone(true);
            }
        }, 35);
        return () => clearInterval(iv);
    }, [started]);

    const codeBlock = (
        <pre
            className={`bg-card border border-card-border rounded-xl p-5 md:p-6 font-mono text-xs md:text-sm overflow-x-auto ${
                PHOTO ? "shadow-2xl" : "w-full"
            }`}
            aria-label="Osnovni podaci o meni"
        >
            {/* Rezerviše prostor da se sekcija ne pomera dok se tekst kuca */}
            <code className="grid">
                <span className="invisible col-start-1 row-start-1" aria-hidden="true">{full}</span>
                <span className="col-start-1 row-start-1">
                    {text}
                    <span className={done ? "animate-pulse" : ""}>{"|"}</span>
                </span>
            </code>
        </pre>
    );

    return (
        <section id="o-meni" ref={sectionRef} className="py-20 px-[5vw]">
            <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mx-auto">

                <div className="flex flex-col gap-5">
                    <h2>O meni</h2>
                    <p className="text-muted text-base md:text-lg leading-relaxed">
                        Zdravo, ja sam Slaviša — web developer sa Uba, kod Beograda.
                        Pravim sajtove i online prodavnice za male biznise kojima treba nešto što zaista radi, a ne samo lepo izgleda.
                    </p>
                    <p className="text-muted text-base md:text-lg leading-relaxed">
                        Radite direktno sa mnom, bez agencije i posrednika. Dizajn, izradu, hosting i održavanje radim sam,
                        pa uvek znate kome da se obratite.
                    </p>
                    <p className="text-muted text-base md:text-lg leading-relaxed">
                        Cilj mi nije samo da napravim sajt, već da vašem biznisu rešim problem.
                        Držim se rokova, redovno vas obaveštavam o napretku i ne nestajem nakon isporuke.
                    </p>
                    <p className="text-muted text-base md:text-lg leading-relaxed">
                        Sarađujem online sa klijentima iz cele Srbije, a po dogovoru i uživo u Beogradu i okolini.
                    </p>

                    <div className="flex flex-col gap-2.5 pt-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-muted">Tehnologije sa kojima radim</span>
                        <ul className="flex flex-wrap gap-2">
                            {stack.map(tech => (
                                <li
                                    key={tech}
                                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-card-border bg-card"
                                >
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {PHOTO ? (
                    <div className="relative mx-auto w-full max-w-md pb-16 lg:pb-0">
                        <div className="relative aspect-4/5 rounded-2xl overflow-hidden border border-card-border">
                            <Image
                                src={PHOTO}
                                alt="Slaviša Arsenijević, web developer"
                                fill
                                sizes="(min-width: 1024px) 28rem, 90vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-2 -left-4 lg:-left-16 lg:bottom-8 max-w-[90%]">
                            {codeBlock}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">{codeBlock}</div>
                )}

            </div>
        </section>
    );
}
