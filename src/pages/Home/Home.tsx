"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Typography } from "@mui/material"
import MainLayout from "../../layouts/MainLayout"
import EventList from "../../components/EventList/EventList"
import { useEvents } from "../../hooks/useEvents"
import { useCart } from "../../context/CartContext"
import FilterDialog, { type FilterOptions } from "../../components/FilterDialog/FilterDialog"
import LocationFilter from "../../components/LocationFilter/LocationFilter"
import "./Home.scss"

const Home: React.FC = () => {
    // Hier tracken der Suchbegriffe und Filter-Einstellungen
    const [searchTerm, setSearchTerm] = useState("")
    const [filterDialogOpen, setFilterDialogOpen] = useState(false)
    const [filters, setFilters] = useState<FilterOptions>({
        sortBy: "date-asc",
        city: "",
        venue: "",
        dateRange: {
            start: "",
            end: "",
        },
    })

    // Events laden und Cart-Funktionalität holen
    const { events, loading, error } = useEvents(searchTerm)
    const { addToCart } = useCart()

    // Städte und Orte aus den Events herausfiltern - praktisch für unsere Filter-Dropdowns
    const cities = useMemo(() => {
        const uniqueCities = new Set(events.map((event) => event.city))
        return Array.from(uniqueCities)
    }, [events])

    const venues = useMemo(() => {
        const uniqueVenues = new Set(events.map((event) => event.venue?.name).filter(Boolean))
        return Array.from(uniqueVenues) as string[]
    }, [events])

    // Unsere Hauptlogik: Events filtern und sortieren - bisschen kompliziert, aber funktioniert zuverlässig
    const filteredAndSortedEvents = useMemo(() => {
        let filtered = [...events]

        // Stadt rausfiltern, wenn ausgewählt
        if (filters.city) {
            filtered = filtered.filter((event) => event.city === filters.city)
        }

        // Veranstaltungsorte filtern, wenn ausgewählt
        if (filters.venue) {
            filtered = filtered.filter((event) => event.venue?.name === filters.venue)
        }

        // Datumsbereich checken - von bis Logik
        if (filters.dateRange.start) {
            const startDate = new Date(filters.dateRange.start)
            filtered = filtered.filter((event) => {
                const eventDate = new Date(event.date || event.startTime)
                return eventDate >= startDate
            })
        }

        if (filters.dateRange.end) {
            const endDate = new Date(filters.dateRange.end)
            filtered = filtered.filter((event) => {
                const eventDate = new Date(event.date || event.startTime)
                return eventDate <= endDate
            })
        }

        // ssortieren - aufsteigend, absteigend oder nach Beliebtheit
        filtered.sort((a, b) => {
            const dateA = new Date(a.date || a.startTime).getTime()
            const dateB = new Date(b.date || b.startTime).getTime()

            if (filters.sortBy === "date-asc") {
                return dateA - dateB
            } else if (filters.sortBy === "date-desc") {
                return dateB - dateA
            } else if (filters.sortBy === "popularity") {
                return b.attending - a.attending
            }

            return 0
        })

        return filtered
    }, [events, filters])

    // nach Datum gruppieren - macht die Anzeige übersichtlicher
    const filteredEventsGroupedByDate = useMemo(() => {
        return filteredAndSortedEvents.reduce(
            (groups, event) => {
                const eventDate = event.date || event.startTime
                const date = new Date(eventDate).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })

                if (!groups[date]) {
                    groups[date] = []
                }

                groups[date].push(event)
                return groups
            },
            {} as Record<string, typeof events>,
        )
    }, [filteredAndSortedEvents])

    // Debugging - um zu sehen, was gerade passiert
    useEffect(() => {
        if (Object.keys(filteredEventsGroupedByDate).length > 0) {
            console.log("Gefilterte Datums-Gruppen:", Object.keys(filteredEventsGroupedByDate))
        }
    }, [filteredEventsGroupedByDate])

    // Unsere Event-Handler für verschiedene Interaktionen
    const handleSearch = (term: string) => {
        setSearchTerm(term)
    }

    const handleFilterClick = () => {
        setFilterDialogOpen(true)
    }

    const handleFilterClose = () => {
        setFilterDialogOpen(false)
    }

    const handleApplyFilters = (newFilters: FilterOptions) => {
        setFilters(newFilters)
    }

    const handleClearFilters = () => {
        setFilters({
            sortBy: "date-asc",
            city: "",
            venue: "",
            dateRange: {
                start: "",
                end: "",
            },
        })
    }

    const handleAddToCart = (event: any) => {
        addToCart(event)
    }

    return (
        <MainLayout onSearch={handleSearch} onFilterClick={handleFilterClick}>
            <div className="home">
                <Typography variant="h4" className="home__title">
                    Veranstaltungen
                </Typography>

                <LocationFilter city={filters.city} dateRange={filters.dateRange} onClear={handleClearFilters} />

                <EventList
                    eventsGroupedByDate={filteredEventsGroupedByDate}
                    loading={loading}
                    error={error}
                    onAddToCart={handleAddToCart}
                />

                <FilterDialog
                    open={filterDialogOpen}
                    onClose={handleFilterClose}
                    onApplyFilters={handleApplyFilters}
                    cities={cities}
                    venues={venues}
                    currentFilters={filters}
                />
            </div>
        </MainLayout>
    )
}

export default Home