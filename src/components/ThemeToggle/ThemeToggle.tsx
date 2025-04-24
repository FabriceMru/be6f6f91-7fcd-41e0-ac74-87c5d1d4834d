"use client"

import type React from "react"
import { IconButton, Tooltip } from "@mui/material"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { useTheme } from "../../context/ThemeContext"
import "./ThemeToggle.scss"

const ThemeToggle: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme()

    return (
        <Tooltip title={isDarkMode ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"}>
            <IconButton onClick={toggleTheme} color="inherit" className="theme-toggle">
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    )
}

export default ThemeToggle
