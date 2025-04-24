"use client"

import type React from "react"
import { useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    Box,
    Typography,
    Divider,
} from "@mui/material"
import "./FilterDialog.scss"

export interface FilterOptions {
    sortBy: "date-asc" | "date-desc" | "popularity"
    city: string
    venue: string
    dateRange: {
        start: string
        end: string
    }
}

interface FilterDialogProps {
    open: boolean
    onClose: () => void
    onApplyFilters: (filters: FilterOptions) => void
    cities: string[]
    venues: string[]
    currentFilters: FilterOptions
}

const FilterDialog: React.FC<FilterDialogProps> = ({
                                                       open,
                                                       onClose,
                                                       onApplyFilters,
                                                       cities,
                                                       venues,
                                                       currentFilters,
                                                   }) => {
    const [filters, setFilters] = useState<FilterOptions>(currentFilters)

    const handleChange = (field: keyof FilterOptions, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleDateRangeChange = (field: "start" | "end", value: string) => {
        setFilters((prev) => ({
            ...prev,
            dateRange: {
                ...prev.dateRange,
                [field]: value,
            },
        }))
    }

    const handleApply = () => {
        onApplyFilters(filters)
        onClose()
    }

    const handleReset = () => {
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

    return (
        <Dialog open={open} onClose={onClose} className="filter-dialog">
            <DialogTitle>Filtern der  Events</DialogTitle>
            <DialogContent>
                <Box className="filter-dialog__section">
                    <Typography variant="subtitle1" className="filter-dialog__section-title">
                        Sortieren
                    </Typography>
                    <FormControl component="fieldset" fullWidth>
                        <RadioGroup value={filters.sortBy} onChange={(e) => handleChange("sortBy", e.target.value)}>
                            <FormControlLabel value="date-asc" control={<Radio />} label="Datum (Aufsteigend)" />
                            <FormControlLabel value="date-desc" control={<Radio />} label="Datum (Absteigend)" />
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Divider className="filter-dialog__divider" />

                <Box className="filter-dialog__section">
                    <Typography variant="subtitle1" className="filter-dialog__section-title">
                        Standort
                    </Typography>

                    <FormControl fullWidth className="filter-dialog__form-control">
                        <InputLabel id="city-select-label">Stadt</InputLabel>
                        <Select
                            labelId="city-select-label"
                            value={filters.city}
                            label="Stadt"
                            onChange={(e) => handleChange("city", e.target.value)}
                        >
                            <MenuItem value="">Alle Städte</MenuItem>
                            {cities.map((city) => (
                                <MenuItem key={city} value={city}>
                                    {city}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth className="filter-dialog__form-control">
                        <InputLabel id="venue-select-label">Veranstaltungsort</InputLabel>
                        <Select
                            labelId="venue-select-label"
                            value={filters.venue}
                            label="Veranstaltungsort"
                            onChange={(e) => handleChange("venue", e.target.value)}
                        >
                            <MenuItem value="">All Venues</MenuItem>
                            {venues.map((venue) => (
                                <MenuItem key={venue} value={venue}>
                                    {venue}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Divider className="filter-dialog__divider" />

                <Box className="filter-dialog__section">
                    <Typography variant="subtitle1" className="filter-dialog__section-title">
                        Zeitraum
                    </Typography>

                    <Box className="filter-dialog__date-range">
                        <TextField
                            label="Von"
                            type="date"
                            value={filters.dateRange.start}
                            onChange={(e) => handleDateRangeChange("start", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            className="filter-dialog__date-input"
                        />
                        <TextField
                            label="Bis"
                            type="date"
                            value={filters.dateRange.end}
                            onChange={(e) => handleDateRangeChange("end", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            className="filter-dialog__date-input"
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleReset} color="inherit">
                    Zurücksetzen
                </Button>
                <Button onClick={onClose} color="inherit">
                    Abbrechen
                </Button>
                <Button onClick={handleApply} color="primary" variant="contained">
                    Bestätigen
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FilterDialog
