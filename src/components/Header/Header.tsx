"use client"

import type React from "react"
import { useState } from "react"
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    useMediaQuery,
    useTheme
} from "@mui/material"
import EventIcon from "@mui/icons-material/Event"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"
import CartIcon from "../CartIcon/CartIcon"
import FavoritesIcon from "../FavoritesIcon/FavoritesIcon"
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import SearchBar from "../SearchBar/SearchBar"
import FilterListIcon from "@mui/icons-material/FilterList"
import MobileDrawer from "../MobileDrawer/MobileDrawer"
import "./Header.scss"

interface HeaderProps {
    onSearch?: (term: string) => void
    onFilterClick?: () => void
}

const Header: React.FC<HeaderProps> = ({ onSearch, onFilterClick }) => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const theme = useTheme()

    // Prüft, ob wir gerade auf einem kleineren Screen (Tablet oder Handy) sind
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    // Öffnet/Schließt das mobile Menü (Drawer)
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <>
            {/* Obere Navigationsleiste – bleibt beim Scrollen sichtbar */}
            <AppBar position="sticky" className="header">
                <Toolbar className="header__toolbar">

                    {/* Zeige Hamburger-Menü nur auf mobilen Geräten */}
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className="header__menu-button"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    {/* Logo + Titel der App, verlinkt zur Startseite */}
                    <Link to="/" className="header__logo-link">
                        <Box className="header__logo">
                            <EventIcon className="header__icon" />
                            <Typography variant="h6" component="div" className="header__title">
                                Events App
                            </Typography>
                        </Box>
                    </Link>

                    {/* Suchleiste + Filterbutton (zentral in der Navigation) */}
                    <Box className="header__search-container">
                        <SearchBar onSearch={onSearch || (() => {})} compact />
                        <IconButton
                            color="inherit"
                            onClick={onFilterClick}
                            className="header__filter-button"
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Box>

                    {/* Rechte Seite der Navigation: Icons je nach Gerät */}
                    <Box className="header__actions">
                        {/* Nur auf Desktop: Theme-Wechsel & Favoriten */}
                        {!isMobile && <ThemeToggle />}
                        {!isMobile && <FavoritesIcon />}
                        {/* Warenkorb ist immer sichtbar */}
                        <CartIcon />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Seitliches Menü (nur auf Mobilgeräten) */}
            <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    )
}

export default Header
