import React from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartIcon.scss';

const CartIcon: React.FC = () => {
    const { cartCount } = useCart();

    return (
        <Link to="/cart" className="cart-icon">
            <IconButton color="inherit" aria-label="cart">
                <Badge badgeContent={cartCount} color="error" overlap="circular">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        </Link>
    );
};

export default CartIcon;