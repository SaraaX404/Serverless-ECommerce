import { FC } from 'react';
import { Header } from '../../Components/Header/Header.component';
import { ProductCard } from '../../Components/Product/Product.component';
import { useCart } from '../../Context/Cart';
import { Container, Grid } from '@mui/material';
import data from '../../Data/data.json';

const Marketplace: FC = () => {
  const { addItem } = useCart();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Header title="Marketplace" />
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {data.products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={() => addItem(product)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Marketplace;
