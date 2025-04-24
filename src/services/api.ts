import axios from "axios"
import type { Event } from "../types/Event"

// URL für die Events API
// Hab die von Teclead genommen
const API_URL = "https://teclead-ventures.github.io/data/london-events.json"

/**
 * Events von der API holen
 * Debugging eingebaut damit ,um Datenstruktur zu verstehen
 */
export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const response = await axios.get<Event[]>(API_URL)

        // Debug: Überprüfe die ersten paar Events und ihre Datumsfelder
        console.log(
            "API Daten Beispiel:",
            response.data.slice(0, 3).map((event) => ({
                id: event._id,
                title: event.title,
                date: event.date,
                startTime: event.startTime,
                formattedDate: new Date(event.startTime).toLocaleDateString("de-DE"),
            })),
        )

        return response.data
    } catch (error) {
        console.error("Error fetching events:", error)
        throw error
    }
}