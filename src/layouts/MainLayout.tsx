import type React from "react"
import type { ReactNode } from "react"
import Header from "../components/Header/Header"
import { Box } from "@mui/material"
import "./MainLayout.scss"

interface MainLayoutProps {
    children: ReactNode
    onSearch?: (term: string) => void
    onFilterClick?: () => void
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onSearch, onFilterClick }) => {
    return (
        <Box className="main-layout">
            <Header onSearch={onSearch} onFilterClick={onFilterClick} />
            <Box component="main" className="main-layout__content">
                {children}
            </Box>
        </Box>
    )
}

export default MainLayout
