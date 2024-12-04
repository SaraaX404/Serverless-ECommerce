import { FC } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { CartProps } from './Cart.types';

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: '400px',
    padding: '20px',
  },
});

const CartComponent: FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem }) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <StyledDrawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Shopping Cart
        </Typography>

        {items.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {items.map((item) => (
                <ListItem
                  key={item.product.id}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => onRemoveItem(item.product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText 
                    primary={item.product.name}
                        secondary={`$${item.product.price.toFixed(2)} x ${item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>

            <Box sx={{ 
              borderTop: 1, 
              borderColor: 'divider',
              pt: 2,
              mt: 2
            }}>
              <Typography variant="h6" component="div">
                Total: ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </StyledDrawer>
  );
};

export default CartComponent;
