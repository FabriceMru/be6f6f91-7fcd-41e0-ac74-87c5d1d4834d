"use client"

import { useState, useEffect, useMemo } from "react"
import type { Event, EventsGroupedByDate } from "../types/Event"
import { fetchEvents } from "../services/api"

/**
 * Hook für die Verwaltung von Events
 * Hab das so aufgebaut, dass die Events gefiltert und nach Datum sortiert werden
 * @param searchTerm - Suchbegriff für die Filterung (optional)
 */
export const useEvents = (searchTerm = "") => {
    // Meine States für die Events-Verwaltung
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // Effect zum Laden der Events beim ersten Render
    // Musste async machen wegen der API
    useEffect(() => {
        const getEvents = async () => {
            try {
                // Loading während des Fetches aktivieren
                setLoading(true)
                const data = await fetchEvents()
                setEvents(data)
                // Error zurücksetzen falls vorher einer da war
                setError(null)
            } catch (err) {
                // Fehlermeldung für den User setzen
                setError("Failed to fetch events")
                // Für mich zum Debuggen
                console.error(err)
            } finally {
                // Am Ende immer Loading aus, egal was passiert ist
                setLoading(false)
            }
        }

        // Direkt beim Mounten die Events holen
        getEvents()
    }, [])

    // Events nach Suchbegriff filtern und sortieren
    // useMemo damit das nicht bei jedem Render neu berechnet wird
    const filteredEvents = useMemo(() => {
        return events
            .filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                // Manchmal kommt das Datum als date, manchmal als startTime
                // Deswegen hier || als Fallback
                const dateA = new Date(a.date || a.startTime).getTime()
                const dateB = new Date(b.date || b.startTime).getTime()
                return dateA - dateB
            })
    }, [events, searchTerm])

    // Events nach Datum gruppieren für die Anzeige
    // Auch mit useMemo optimiert, war sonst zu langsam
    const eventsGroupedByDate = useMemo<EventsGroupedByDate>(() => {
        return filteredEvents.reduce((groups, event) => {
            // Das mit dem date || startTime nochmal, 
            // weil die API nicht konsistent ist
            const eventDate = event.date || event.startTime

            // Datum schön formatieren für die deutsche Anzeige
            const date = new Date(eventDate).toLocaleDateString("de-DE", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })

            // Neues Array erstellen wenn es den Tag noch nicht gibt
            if (!groups[date]) {
                groups[date] = []
            }
            groups[date].push(event)
            return groups
        }, {} as EventsGroupedByDate)
    }, [filteredEvents])

    // Alles zurückgeben was wir brauchen
    return {
        events: filteredEvents,
        eventsGroupedByDate,
        loading,
        error,
    }
}