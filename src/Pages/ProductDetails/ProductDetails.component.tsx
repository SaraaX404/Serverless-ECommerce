import { FC } from 'react';
import { LayoutComponent } from '../../Components';
import { ProductDetailsComponent } from '../../Components/ProductDetails';
import { Header } from '../../Components/Header/Header.component';

const ProductDetailsPage: FC = () => {
  return (
    <LayoutComponent title="Product Details">
        <Header title="Product Details" />
      <ProductDetailsComponent />
    </LayoutComponent>
  );
};

export default ProductDetailsPage;
