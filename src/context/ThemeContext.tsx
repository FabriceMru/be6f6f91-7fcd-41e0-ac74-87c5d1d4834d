"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ThemeContextType {
    isDarkMode: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme")
            return savedTheme === "dark" || (savedTheme === null && window.matchMedia("(prefers-color-scheme: dark)").matches)
        }
        return false
    })

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark-theme")
        } else {
            document.documentElement.classList.remove("dark-theme")
        }
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", isDarkMode ? "dark" : "light")
        }
    }, [isDarkMode])

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev)
    }

    const value = {
        isDarkMode,
        toggleTheme,
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
