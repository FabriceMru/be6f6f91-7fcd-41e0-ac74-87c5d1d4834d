"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Event } from "../types/Event"

interface CartContextType {
    cartItems: Event[]
    addToCart: (event: Event) => void
    removeFromCart: (eventId: string) => void
    isInCart: (eventId: string) => boolean
    cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = (): CartContextType => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}

interface CartProviderProps {
    children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Event[]>(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart")
            return savedCart ? JSON.parse(savedCart) : []
        }
        return []
    })

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cartItems))
        }
    }, [cartItems])

    const addToCart = (event: Event) => {
        if (!isInCart(event._id)) {
            setCartItems((prevItems) => [...prevItems, event])
        }
    }

    const removeFromCart = (eventId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== eventId))
    }

    const isInCart = (eventId: string) => {
        return cartItems.some((item) => item._id === eventId)
    }

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        isInCart,
        cartCount: cartItems.length,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
