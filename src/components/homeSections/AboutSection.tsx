"use client"

import { useState, useEffect, useRef } from "react";

export default function AboutSection() {
    const [text, setText] = useState("");
    const [started, setStarted] = useState(false);
    const [done, setDone] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const full = `const o_meni = {\n  ime: "Slaviša",\n  prezime: "Arsenijević",\n  godine: 20,\n  pozicija: "Full Stack Developer",\n  lokacija: "Srbija",\n  github: "github.com/Slavisa05",\n  dostupan: true,\n}`;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
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
        }, 40);
        return () => clearInterval(iv);
    }, [started, full]);

    return (
        <section ref={sectionRef} className="py-20 px-[5vw]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mx-auto">

                {/* Uvodni tekst */}
                <div className="flex flex-col gap-5">
                    <h2>O meni</h2>
                    <p className="text-muted text-base md:text-lg leading-relaxed">
                        Zdravo, ja sam Slaviša — full stack developer iz Srbije.
                        Pravim web sajtove aplikacije za male biznise kojima treba nešto što zaista radi, a ne samo dobro izgleda.
                    </p>
                    <p className="text-muted text-base md:text-lg leading-relaxed">
                        Radim sa nextjs-om, Django-om i PostgreSQL-om. Većina mojih projekata
                        kreće od razgovora s klijentom i završava se deployom na produkciju — sve sam.
                    </p>

                    <p className="text-muted text-base md:text-lg leading-relaxed">
                        Nije mi cilj samo da napravim sajt, cilj mi je da vašem biznisu rešim problem.
                        Držim se rokova, redovno vas izveštavam o radu i ne nestajem nakon isporuke.
                    </p>

                    <p className="text-muted text-base md:text-lg leading-relaxed">
                        Kada ne kodiram, najviše volim da učim nove tehnologije i da pratim nove trendove u tehnologiji (posebno AI).
                    </p>
                </div>

                {/* Kod blok sa animacijom */}
                <div className="flex items-center justify-center">
                    <pre className="w-full bg-card border border-card-border rounded-xl p-5 md:p-6 font-mono text-xs md:text-sm overflow-x-auto">
                        <code>
                            {text}
                            <span className={done ? "animate-pulse" : ""}>{"|"}</span>
                        </code>
                    </pre>
                </div>

            </div>
        </section>
    );
}