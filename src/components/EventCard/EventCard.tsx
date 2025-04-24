"use client"

import type React from "react"
import { Card, CardMedia, Typography, Button, CardContent, Box, Avatar, IconButton } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PeopleIcon from "@mui/icons-material/People"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import type { Event } from "../../types/Event"
import { useFavorites } from "../../context/FavoritesContext"
import { useCart } from "../../context/CartContext"
import "./EventCard.scss"

interface EventCardProps {
    event: Event
    onAddToCart: (event: Event) => void
    showRemoveFavorite?: boolean
    onRemoveFavorite?: (eventId: string) => void
}

const EventCard: React.FC<EventCardProps> = ({ event, onAddToCart, showRemoveFavorite = false, onRemoveFavorite }) => {
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
    const { isInCart } = useCart()
    const isFavorited = isFavorite(event._id)
    const isInCartAlready = isInCart(event._id)

    const handleAddToCart = () => {
        if (!isInCartAlready) {
            onAddToCart(event)
        }
    }

    const handleFavoriteToggle = () => {
        if (isFavorited) {
            removeFromFavorites(event._id)
        } else {
            addToFavorites(event)
        }
    }

    const handleRemoveFavorite = () => {
        if (onRemoveFavorite) {
            onRemoveFavorite(event._id)
        }
    }

    const handleOpenLocation = () => {
        const query = encodeURIComponent(`${event.venue?.name}, ${event.city}`)
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    // barsierend auf dem Titel des Events, erzeugt Farbe
    const getAvatarColor = (title: string) => {
        const colors = [
            "#FF5722",
            "#E91E63",
            "#9C27B0",
            "#673AB7",
            "#3F51B5",
            "#2196F3",
            "#03A9F4",
            "#00BCD4",
            "#009688",
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
        ]
        const index = title.charCodeAt(0) % colors.length
        return colors[index]
    }

    return (
        <Card className="event-card">
            <div className="event-card__title-container">
                <div className="event-card__title-with-avatar">
                    <Avatar className="event-card__avatar" sx={{ bgcolor: getAvatarColor(event.title) }}>
                        {event.title.charAt(0)}
                    </Avatar>
                    <Typography className="event-card__title">{event.title}</Typography>
                </div>
                {!showRemoveFavorite && (
                    <IconButton
                        className="event-card__favorite-button"
                        onClick={handleFavoriteToggle}
                        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorited ? (
                            <FavoriteIcon className="event-card__favorite-icon event-card__favorite-icon--active" />
                        ) : (
                            <FavoriteBorderIcon className="event-card__favorite-icon" />
                        )}
                    </IconButton>
                )}
            </div>
            <CardMedia component="img" image={event.flyerFront} alt={event.title} className="event-card__image" />
            <CardContent className="event-card__content">
                <Box className="event-card__details">
                    <Box className="event-card__detail-item">
                        <CalendarTodayIcon fontSize="small" />
                        <Typography variant="body2">Datum: {formatDate(event.date || event.startTime)}</Typography>
                    </Box>

                    <Box className="event-card__detail-item">
                        <LocationOnIcon fontSize="small" />
                        <Typography variant="body2" className="event-card__location-text" onClick={handleOpenLocation}>
                            {event.venue?.name}
                        </Typography>
                    </Box>

                    <Box className="event-card__detail-item">
                        <PeopleIcon fontSize="small" />
                        <Typography variant="body2">Teilnehmer: {event.attending}</Typography>
                    </Box>
                </Box>

                <Box className="event-card__footer">
                    {showRemoveFavorite ? (
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleRemoveFavorite}
                            className="event-card__remove-button"
                            fullWidth
                        >
                            AUS FAVORITEN ENTFERNEN
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color={isInCartAlready ? "success" : "primary"}
                            startIcon={isInCartAlready ? <CheckCircleIcon /> : <ShoppingCartIcon />}
                            onClick={handleAddToCart}
                            className={isInCartAlready ? "event-card__in-cart-button" : "event-card__add-button"}
                            disabled={isInCartAlready}
                            fullWidth
                        >
                            {isInCartAlready ? "BEREITS IM WARENKORB" : "HINZUFÜGEN"}
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}

export default EventCard
