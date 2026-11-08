// Mali store za pristanak na kolačiće (localStorage + useSyncExternalStore)

export type Consent = "accepted" | "rejected" | null

const KEY = "cookie-consent"
const listeners = new Set<() => void>()
let gaLoaded = false

export function markGaLoaded() {
    gaLoaded = true
}

export function getConsent(): Consent {
    try {
        const v = localStorage.getItem(KEY)
        return v === "accepted" || v === "rejected" ? v : null
    } catch {
        return null
    }
}

// Na serveru ne znamo izbor korisnika — ne prikazujemo ni baner ni GA dok se stranica ne učita
export function getServerConsent(): Consent | "unknown" {
    return "unknown"
}

export function subscribeConsent(cb: () => void) {
    listeners.add(cb)
    window.addEventListener("storage", cb)
    return () => {
        listeners.delete(cb)
        window.removeEventListener("storage", cb)
    }
}

export function setConsent(value: Exclude<Consent, null>) {
    try {
        localStorage.setItem(KEY, value)
    } catch {}
    // GA je već učitan i postavio kolačiće — reload ga gasi
    if (gaLoaded && value === "rejected") {
        clearGaCookies()
        window.location.reload()
        return
    }
    listeners.forEach(l => l())
}

export function resetConsent() {
    try {
        localStorage.removeItem(KEY)
    } catch {}
    listeners.forEach(l => l())
}

function clearGaCookies() {
    const host = window.location.hostname
    const domains = [host, `.${host}`, `.${host.replace(/^www\./, "")}`]
    document.cookie.split(";").forEach(c => {
        const name = c.split("=")[0].trim()
        if (name.startsWith("_ga") || name.startsWith("_gid")) {
            domains.forEach(d => {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`
            })
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        }
    })
}
