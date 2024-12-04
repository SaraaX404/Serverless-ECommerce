import { FC } from 'react';
import { LayoutComponent as Layout, MarketplaceComponent as Marketplace } from '../../Components';

const MarketplacePage: FC = () => {
  return (
    <Layout title="Marketplace" >
      <Marketplace />
    </Layout>
  );
};

export default MarketplacePage;


