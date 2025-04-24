"use client"

import type React from "react"
import { Typography, Box, Button } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import MainLayout from "../../layouts/MainLayout"
import { useFavorites } from "../../context/FavoritesContext"
import { useCart } from "../../context/CartContext"
import { Link } from "react-router-dom"
import "./Favorites.scss"
import EventCard from "../../components/EventCard/EventCard"

const Favorites: React.FC = () => {
    const { favorites, removeFromFavorites } = useFavorites()
    const { addToCart } = useCart()

    const handleAddToCart = (event: any) => {
        addToCart(event)
    }

    const handleRemoveFavorite = (eventId: string) => {
        removeFromFavorites(eventId)
    }

    return (
        <MainLayout>
            <div className="favorites-page">
                <Box className="favorites-page__header">
                    <Typography variant="h4" component="h1" className="favorites-page__title">
                        <FavoriteIcon className="favorites-page__icon" />
                        <span className="favorites-page__title-text">Favoriten ({favorites.length})</span>
                    </Typography>
                    <Link to="/" className="favorites-page__back">
                        <Button variant="outlined">Weiter stöbern</Button>
                    </Link>
                </Box>

                {favorites.length === 0 ? (
                    <Box className="favorites-page__empty">
                        <Typography variant="h6" align="center">
                            Du hast noch keine Favoriten hinzugefügt
                        </Typography>
                        <Link to="/" className="favorites-page__back">
                            <Button variant="contained" color="primary" className="favorites-page__browse-button">
                                Zu den Events
                            </Button>
                        </Link>
                    </Box>
                ) : (
                    <div className="favorites-page__items-container">
                        {favorites.map((event) => (
                            <div key={event._id} className="favorites-page__card-wrapper">
                                <EventCard
                                    event={event}
                                    onAddToCart={handleAddToCart}
                                    showRemoveFavorite={true}
                                    onRemoveFavorite={handleRemoveFavorite}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default Favorites
