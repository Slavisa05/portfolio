"use client"

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const noopSubscribe = () => () => {}

export default function ThemeToggle() {
    // resolvedTheme je stvarna tema i kada je izabrana "system"
    const { resolvedTheme, setTheme } = useTheme()
    // false na serveru, true u browseru — izbegava hydration mismatch bez setState u efektu
    const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)

    if (!mounted) return <span className="block w-9.5 h-9.5" aria-hidden="true" />;

    const isDark = resolvedTheme === "dark"

    return(
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 rounded-lg border border-card-border
                        bg-card text-foreground
                        hover:bg-accent hover:text-white
                        transition-colors duration-200 cursor-pointer"
            aria-label={isDark ? "Uključi svetlu temu" : "Uključi tamnu temu"}
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    )
}
