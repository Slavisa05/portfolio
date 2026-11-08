"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import { GoogleAnalytics } from "@next/third-parties/google"
import { getConsent, getServerConsent, markGaLoaded, resetConsent, setConsent, subscribeConsent } from "@/lib/consent"

const GA_ID = "G-2DQFYEV6ME"

export default function CookieConsent() {
    const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent)

    if (consent === "accepted") {
        markGaLoaded()
        return <GoogleAnalytics gaId={GA_ID} />
    }
    if (consent !== null) return null // "rejected" ili server render

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Podešavanja kolačića"
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-60 bg-card border-2 border-card-border rounded-xl shadow-2xl p-5 flex flex-col gap-4"
        >
            <p className="text-sm leading-relaxed">
                Koristim Google Analytics kolačiće da bih video koliko ljudi posećuje sajt i šta ih zanima.
                Ništa se ne učitava dok ne prihvatite.{" "}
                <Link href="/politika-privatnosti#kolacici" className="underline text-muted hover:text-accent">
                    Saznajte više
                </Link>
            </p>
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => setConsent("accepted")}
                    className="flex-1 text-sm font-medium uppercase tracking-wide py-2 px-4 rounded-xl border-2 border-accent bg-accent text-white hover:bg-accent-hover hover:border-accent-hover transition-colors cursor-pointer"
                >
                    Prihvatam
                </button>
                <button
                    type="button"
                    onClick={() => setConsent("rejected")}
                    className="flex-1 text-sm font-medium uppercase tracking-wide py-2 px-4 rounded-xl border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
                >
                    Odbijam
                </button>
            </div>
        </div>
    )
}

// Link u footeru — ponovo otvara baner
export function CookieSettingsButton({ className }: { className?: string }) {
    return (
        <button type="button" onClick={resetConsent} className={className}>
            Podešavanja kolačića
        </button>
    )
}
