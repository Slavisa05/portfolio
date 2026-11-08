// Kontakt forma → Brevo transactional API (https://developers.brevo.com/reference/sendtransacemail)
// Potrebno u .env na serveru: BREVO_API_KEY=...
// Ako Brevo vraća 401 "unrecognised IP address", dodaj IP VPS-a u Brevo → Security → Authorized IPs.

const SENDER = { name: "slavisadev.com", email: "no-reply@slavisadev.com" }
const RECIPIENT = { name: "Slaviša Arsenijević", email: "slavisaarsenijevic05@gmail.com" }

const LIMITS = { ime: 100, telefon: 30, email: 150, paket: 60, poruka: 5000 }

// Jednostavan rate limit u memoriji (dovoljan za jedan PM2 proces): max 5 poruka / 10 min po IP adresi
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string) {
    const now = Date.now()
    const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
    recent.push(now)
    hits.set(ip, recent)
    if (hits.size > 1000) {
        for (const [key, times] of hits) {
            if (times.every(t => now - t >= WINDOW_MS)) hits.delete(key)
        }
    }
    return recent.length > MAX_PER_WINDOW
}

function field(value: unknown, max: number) {
    return typeof value === "string" ? value.trim().slice(0, max) : ""
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null)
        if (!body || typeof body !== "object") {
            return Response.json({ ok: false, error: "Neispravan zahtev." }, { status: 400 })
        }

        // Honeypot: pravi korisnici ne vide ovo polje, botovi ga popune.
        // Vraćamo "ok" da bot ne bi znao da je odbijen.
        if (field(body.website, 200)) {
            return Response.json({ ok: true })
        }

        const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown"
        if (isRateLimited(ip)) {
            return Response.json(
                { ok: false, error: "Previše poruka za kratko vreme. Pokušajte ponovo za nekoliko minuta." },
                { status: 429 }
            )
        }

        const ime = field(body.ime, LIMITS.ime)
        const telefon = field(body.telefon, LIMITS.telefon)
        const email = field(body.email, LIMITS.email)
        const paket = field(body.paket, LIMITS.paket)
        const poruka = field(body.poruka, LIMITS.poruka)

        if (ime.length < 2 || telefon.replace(/\D/g, "").length < 6 || poruka.length < 5) {
            return Response.json(
                { ok: false, error: "Molimo popunite ime, broj telefona i poruku." },
                { status: 400 }
            )
        }
        if (email && !EMAIL_RE.test(email)) {
            return Response.json({ ok: false, error: "Email adresa nije ispravna." }, { status: 400 })
        }

        const apiKey = process.env.BREVO_API_KEY
        if (!apiKey) {
            console.error("BREVO_API_KEY nije podešen")
            return Response.json({ ok: false }, { status: 500 })
        }

        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "api-key": apiKey,
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({
                sender: SENDER,
                to: [RECIPIENT],
                ...(email ? { replyTo: { email, name: ime } } : {}),
                subject: `Novi upit sa sajta — ${ime}${paket ? ` (${paket})` : ""}`,
                textContent: [
                    `Ime: ${ime}`,
                    `Telefon: ${telefon}`,
                    `Email: ${email || "-"}`,
                    `Paket: ${paket || "-"}`,
                    "",
                    "Poruka:",
                    poruka,
                ].join("\n"),
            }),
            signal: AbortSignal.timeout(10_000),
        })

        if (!res.ok) {
            console.error("Brevo error:", res.status, await res.text())
            return Response.json({ ok: false }, { status: 502 })
        }

        return Response.json({ ok: true })
    } catch (err) {
        console.error("Unexpected error:", err)
        return Response.json({ ok: false }, { status: 500 })
    }
}
