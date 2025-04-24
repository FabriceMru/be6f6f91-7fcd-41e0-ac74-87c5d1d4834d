import type React from "react"
import { Typography, Box, Alert } from "@mui/material"
import EventCard from "../EventCard/EventCard"
import DateDivider from "../DateDivider/DateDivider"
import type { EventsGroupedByDate } from "../../types/Event"
import { useCart } from "../../context/CartContext"
import "./EventList.scss"

interface EventListProps {
    eventsGroupedByDate: EventsGroupedByDate
    loading: boolean
    error: string | null
    onAddToCart: (event: any) => void
}

const EventList: React.FC<EventListProps> = ({ eventsGroupedByDate, loading, error, onAddToCart }) => {
    useCart()

    if (loading) {
        return (
            <Box className="event-list__loading">
                <Typography>Events werden geladen...</Typography>
            </Box>
        )
    }

    if (error) {
        return (
            <Alert severity="error" className="event-list__error">
                {error}
            </Alert>
        )
    }

    const dateKeys = Object.keys(eventsGroupedByDate)

    if (dateKeys.length === 0) {
        return (
            <Box className="event-list__empty">
                <Typography variant="h6">Keine Events gefunden</Typography>
            </Box>
        )
    }

    return (
        <div className="event-list">
            {dateKeys.map((date) => (
                <div key={date} className="event-list__date-group">
                    <DateDivider date={date} sticky />
                    <div className="event-list__cards-container">
                        {eventsGroupedByDate[date].map((event, index) => (
                            <div key={event._id || `${date}-${index}`} className="event-list__card-wrapper">
                                <EventCard event={event} onAddToCart={onAddToCart} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EventList
