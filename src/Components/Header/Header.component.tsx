import { FC, useState } from 'react';
import { AppBar, Toolbar, Typography, Badge, Box, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCart } from '../../Context/Cart';
import { CartComponent } from '../Cart';
import { useAuth } from '../../Context/Auth';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  const { items, total, removeItem } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="subtitle1">
            Total: ${total.toFixed(2)}
          </Typography>
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <CartComponent 
        items={items}
        isOpen={isCartOpen}
        onClose={handleCartClose}
        onRemoveItem={(id) => removeItem(id)}
        calculateTotal={() => total}
      />
    </AppBar>
  );
};
