// Centralni kontakt podaci i navigacija — menjaju se samo ovde.

export const contact = {
    email: "slavisa@slavisadev.com",
    phoneDisplay: "+381 64 081 1781",
    phoneHref: "tel:+381640811781",
    whatsappHref: `https://wa.me/381640811781?text=${encodeURIComponent(
        "Zdravo, zanima me izrada sajta."
    )}`,
}

export const socials = [
    { label: "LinkedIn", url: "https://linkedin.com/in/slaviša-arsenijević-69b986316" },
    { label: "GitHub", url: "https://github.com/Slavisa05" },
] as const

export const navLinks = [
    { label: "projekti", href: "/#projekti" },
    { label: "usluge", href: "/#usluge" },
    { label: "o meni", href: "/#o-meni" },
    { label: "kontakt", href: "/#kontakt" },
]

export const packages = [
    { id: "start", label: "Start — od 250 €" },
    { id: "biznis", label: "Biznis — od 500 €" },
    { id: "pro", label: "Pro — od 800 €" },
    { id: "odrzavanje", label: "Hosting i održavanje" },
    { id: "nisam-siguran", label: "Nisam siguran/na" },
] as const

export type PackageId = (typeof packages)[number]["id"]

// Usluge sekcija javlja kontakt formi koji je paket izabran
export const SELECT_PACKAGE_EVENT = "select-package"
