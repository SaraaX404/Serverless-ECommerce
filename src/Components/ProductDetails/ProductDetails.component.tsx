import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Box, Rating, Button, Divider, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../../Context/Cart';
import data from '../../Data/data.json';


const ProductDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const productData = data.products.find(p => p.id === Number(id));
    setProduct(productData);
  }, [id]);

  if (!product) {
    return (
      <Container>
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <IconButton 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
        aria-label="back"
      >
        <ArrowBackIcon />
      </IconButton>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3
              }}
              src={product.image}
              alt={product.name}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body1" sx={{ ml: 1 }}>
                ({product.rating})
              </Typography>
            </Box>
            
            <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
              ${product.price.toFixed(2)}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Category: {product.category}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Stock Available: {product.stock} units
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => addItem(product)}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                Add to Cart
              </Button>
              
              <Button 
                variant="outlined" 
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
