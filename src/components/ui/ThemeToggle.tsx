"use client"

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted ] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null;
    
    return(
        <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg border border-card-border 
                        bg-card text-foreground
                        hover:bg-accent hover:text-white
                        transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    )
}