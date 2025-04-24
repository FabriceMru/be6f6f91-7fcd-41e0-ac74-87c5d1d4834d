import type React from "react"
import { Typography, Box } from "@mui/material"
import "./DateDivider.scss"

interface DateDividerProps {
    date: string
    sticky?: boolean
}

const DateDivider: React.FC<DateDividerProps> = ({ date, sticky = false }) => {
    // Konvertiere das Datum in ein Format mit Tag und Monat in Großbuchstaben
    const formattedDate = date
        .split(" ")
        .map((part, index) => {
            // Der erste Teil ist der Tag, der zweite der Monat
            if (index === 1) {
                return part.toUpperCase()
            }
            return part
        })
        .join(" ")

    return (
        <Box className={`date-divider ${sticky ? "date-divider--sticky" : ""}`}>
            <Typography variant="h6" component="div" className="date-divider__text">
                {formattedDate}
            </Typography>
        </Box>
    )
}

export default DateDivider
