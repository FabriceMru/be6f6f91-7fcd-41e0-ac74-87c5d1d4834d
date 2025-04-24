"use client"

import type React from "react"
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    IconButton,
} from "@mui/material"
import { Link } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import CloseIcon from "@mui/icons-material/Close"
import { useCart } from "../../context/CartContext"
import { useFavorites } from "../../context/FavoritesContext"
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import "./MobileDrawer.scss"

interface MobileDrawerProps {
    open: boolean
    onClose: () => void
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose }) => {
    const { cartCount } = useCart()
    const { favoritesCount } = useFavorites()

    return (
        <Drawer anchor="left" open={open} onClose={onClose} className="mobile-drawer">
            <Box className="mobile-drawer__header">
                <IconButton onClick={onClose} className="mobile-drawer__close">
                    <CloseIcon />
                </IconButton>
                <Box className="mobile-drawer__theme-toggle">
                    <ThemeToggle />
                </Box>
            </Box>
            <Divider />
            <List className="mobile-drawer__list">
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/" onClick={onClose}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Events" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/favorites" onClick={onClose}>
                        <ListItemIcon>
                            <FavoriteIcon color={favoritesCount > 0 ? "error" : "inherit"} />
                        </ListItemIcon>
                        <ListItemText primary={`Favoriten (${favoritesCount})`} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/cart" onClick={onClose}>
                        <ListItemIcon>
                            <ShoppingCartIcon color={cartCount > 0 ? "primary" : "inherit"} />
                        </ListItemIcon>
                        <ListItemText primary={`Warenkorb (${cartCount})`} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default MobileDrawer
