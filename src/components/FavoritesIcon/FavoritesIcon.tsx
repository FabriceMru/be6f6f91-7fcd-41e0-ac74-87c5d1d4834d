import type React from "react"
import { Badge, IconButton } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { Link } from "react-router-dom"
import { useFavorites } from "../../context/FavoritesContext"
import "./FavoritesIcon.scss"

const FavoritesIcon: React.FC = () => {
    const { favoritesCount } = useFavorites()

    return (
        <Link to="/favorites" className="favorites-icon">
            <IconButton color="inherit" aria-label="favorites">
                <Badge badgeContent={favoritesCount} color="error" overlap="circular">
                    <FavoriteIcon />
                </Badge>
            </IconButton>
        </Link>
    )
}

export default FavoritesIcon
