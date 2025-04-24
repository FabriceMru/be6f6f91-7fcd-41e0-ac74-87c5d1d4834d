"use client"

import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material"
import { CartProvider } from "./context/CartContext"
import { FavoritesProvider } from "./context/FavoritesContext"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import Favorites from "./pages/Favorites/Favorites"
import "./App.scss"

// Wrapper Komponente
const ThemedApp: React.FC = () => {
    const { isDarkMode } = useTheme()

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? "dark" : "light",
            primary: {
                main: "#3f51b5",
            },
            secondary: {
                main: "#f50057",
            },
            background: {
                default: isDarkMode ? "#121212" : "#f8f7f2", // Dark beige in dark mode
                paper: isDarkMode ? "#1e1e1e" : "#ffffff",
            },
            text: {
                primary: isDarkMode ? "#f0f0f0" : "#333333",
                secondary: isDarkMode ? "#aaaaaa" : "#666666",
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                    },
                },
            },
        },
    })

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <FavoritesProvider>
                <CartProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/favorites" element={<Favorites />} />
                        </Routes>
                    </Router>
                </CartProvider>
            </FavoritesProvider>
        </MuiThemeProvider>
    )
}

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <ThemedApp />
        </ThemeProvider>
    )
}

export default App
