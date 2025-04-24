"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Event } from "../types/Event"

interface FavoritesContextType {
    favorites: Event[]
    addToFavorites: (event: Event) => void
    removeFromFavorites: (eventId: string) => void
    isFavorite: (eventId: string) => boolean
    favoritesCount: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider")
    }
    return context
}

interface FavoritesProviderProps {
    children: ReactNode
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<Event[]>(() => {
        if (typeof window !== "undefined") {
            const savedFavorites = localStorage.getItem("favorites")
            return savedFavorites ? JSON.parse(savedFavorites) : []
        }
        return []
    })

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("favorites", JSON.stringify(favorites))
        }
    }, [favorites])

    const addToFavorites = (event: Event) => {
        if (!isFavorite(event._id)) {
            setFavorites((prevItems) => [...prevItems, event])
        }
    }

    const removeFromFavorites = (eventId: string) => {
        setFavorites((prevItems) => prevItems.filter((item) => item._id !== eventId))
    }

    const isFavorite = (eventId: string) => {
        return favorites.some((item) => item._id === eventId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        favoritesCount: favorites.length,
    }

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
