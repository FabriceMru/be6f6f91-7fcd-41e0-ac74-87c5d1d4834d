"use client"

import type React from "react"
import { useState } from "react"
import { Typography, Box, Button, Card, CardMedia, CardContent, Paper, Divider, Alert } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import MainLayout from "../../layouts/MainLayout"
import { useCart } from "../../context/CartContext"
import { Link } from "react-router-dom"
import "./Cart.scss"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PeopleIcon from "@mui/icons-material/People"

const Cart: React.FC = () => {
    const { cartItems, removeFromCart } = useCart()
    const [checkoutComplete, setCheckoutComplete] = useState(false)

    const handleRemoveFromCart = (eventId: string) => {
        removeFromCart(eventId)
    }

    const handleCheckout = () => {
        setCheckoutComplete(true)
        // Hier würde normalerweise die Checkout-Logik stehen
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    // Berechne den Gesamtpreis (hier als Beispiel 36,50€ pro Event)
    const calculateTotal = () => {
        return cartItems.length * 32.50
    }

    return (
        <MainLayout>
            <div className="cart-page">
                <Box className="cart-page__header">
                    <Typography variant="h4" component="h1" className="cart-page__title">
                        <ShoppingCartIcon className="cart-page__icon" />
                        Warenkorb ({cartItems.length})
                    </Typography>
                    <Link to="/" className="cart-page__back">
                        <Button variant="outlined">Weiter stöbern</Button>
                    </Link>
                </Box>

                {checkoutComplete && (
                    <Alert
                        icon={<CheckCircleIcon fontSize="inherit" />}
                        severity="success"
                        className="cart-page__success-message"
                    >
                        Vielen Dank für Ihren Einkauf! Ihre Bestellung wurde erfolgreich abgeschlossen.
                    </Alert>
                )}

                {cartItems.length === 0 && !checkoutComplete ? (
                    <Box className="cart-page__empty">
                        <Typography variant="h6" align="center">
                            Warenkorb ist leer
                        </Typography>
                        <Link to="/" className="cart-page__back">
                            <Button variant="contained" color="primary" className="cart-page__browse-button">
                                zu den Events
                            </Button>
                        </Link>
                    </Box>
                ) : (
                    <div className="cart-page__content">
                        <div className="cart-page__items-container">
                            {!checkoutComplete &&
                                cartItems.map((event) => (
                                    <div key={event._id} className="cart-page__card-wrapper">
                                        <Card className="event-card">
                                            <div className="event-card__title-container">
                                                <Typography className="event-card__title">{event.title}</Typography>
                                            </div>
                                            <CardMedia
                                                component="img"
                                                image={event.flyerFront}
                                                alt={event.title}
                                                className="event-card__image"
                                            />
                                            <CardContent className="event-card__content">
                                                <Box className="event-card__details">
                                                    <Box className="event-card__detail-item">
                                                        <CalendarTodayIcon fontSize="small" />
                                                        <Typography variant="body2">Datum: {formatDate(event.startTime)}</Typography>
                                                    </Box>

                                                    <Box className="event-card__detail-item">
                                                        <LocationOnIcon fontSize="small" />
                                                        <Typography variant="body2" className="event-card__location-text">
                                                            {event.venue?.name}
                                                        </Typography>
                                                    </Box>

                                                    <Box className="event-card__detail-item">
                                                        <PeopleIcon fontSize="small" />
                                                        <Typography variant="body2">Teilnehmer: {event.attending}</Typography>
                                                    </Box>
                                                </Box>

                                                <Box className="event-card__footer">
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => handleRemoveFromCart(event._id)}
                                                        className="event-card__remove-button"
                                                        fullWidth
                                                    >
                                                        ENTFERNEN
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                        </div>

                        {cartItems.length > 0 && !checkoutComplete && (
                            <Paper elevation={3} className="cart-page__summary">
                                <Typography variant="h6" className="cart-page__summary-title">
                                    Bestellübersicht
                                </Typography>

                                <div className="cart-page__summary-items">
                                    {cartItems.map((event) => (
                                        <div key={event._id} className="cart-page__summary-item">
                                            <Typography variant="body2" noWrap
                                                        className="cart-page__summary-item-title">
                                                {event.title}
                                            </Typography>
                                            <Typography variant="body2">32,50 €</Typography>
                                        </div>
                                    ))}
                                </div>

                                <Divider className="cart-page__summary-divider"/>

                                <div className="cart-page__summary-row">
                                    <Typography variant="body1">Zwischensumme</Typography>
                                    <Typography
                                        variant="body1">{calculateTotal().toFixed(2).replace(".", ",")} €</Typography>
                                </div>

                                <div className="cart-page__summary-row">
                                    <Typography variant="body2">Bearbeitungsgebühr</Typography>
                                    <Typography variant="body2">2,50 €</Typography>
                                </div>

                                <Divider className="cart-page__summary-divider"/>

                                <div className="cart-page__summary-row cart-page__summary-row cart-page__summary-total">
                                    <Typography variant="h6">Gesamtsumme</Typography>
                                    <Typography
                                        variant="h6">{(calculateTotal() + 2.5).toFixed(2).replace(".", ",")} €</Typography>
                                </div>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    className="cart-page__checkout-button"
                                    onClick={handleCheckout}
                                >
                                    Zur Kasse
                                </Button>
                            </Paper>
                        )}
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default Cart
