"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Paper, InputBase, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import "./SearchBar.scss"

interface SearchBarProps {
    onSearch: (term: string) => void
    compact?: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, compact = false }) => {
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
    }

    const handleClear = () => {
        setSearchTerm("")
    }

    useEffect(() => {
        // Debounce search to avoid too many re-renders
        const timer = setTimeout(() => {
            onSearch(searchTerm)
        }, 300)

        return () => clearTimeout(timer)
    }, [searchTerm, onSearch])

    return (
        <Paper className={`search-bar ${compact ? "search-bar--compact" : ""}`}>
            <IconButton className="search-bar__icon" aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                className="search-bar__input"
                placeholder={compact ? "Search..." : "Search events..."}
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
            />
            {searchTerm && (
                <IconButton className="search-bar__clear" aria-label="clear search" onClick={handleClear}>
                    <ClearIcon />
                </IconButton>
            )}
        </Paper>
    )
}

export default SearchBar
