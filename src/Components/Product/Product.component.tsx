import { FC } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Product } from '../../Context';
interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    onAddToCart();
  };

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ height: '450px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image={product.image}
          alt={product.name}
        />
        <CardContent sx={{ flexGrow: 1, pb: 8 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Box sx={{ 
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h6" color="primary">
              ${product.price.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
