import type React from "react"
import { Box, Chip, Typography } from "@mui/material"
import "./LocationFilter.scss"

interface LocationFilterProps {
    city: string
    dateRange: {
        start: string
        end: string
    }
    onClear: () => void
}

const LocationFilter: React.FC<LocationFilterProps> = ({ city, dateRange, onClear }) => {
    if (!city && !dateRange.start && !dateRange.end) {
        return null
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    const dateRangeText =
        dateRange.start && dateRange.end ? `${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}` : ""

    return (
        <Box className="location-filter">
            {city && <Chip label={city.toUpperCase()} className="location-filter__chip" onDelete={onClear} />}

            {dateRangeText && <Typography className="location-filter__date-range">{dateRangeText}</Typography>}
        </Box>
    )
}

export default LocationFilter
