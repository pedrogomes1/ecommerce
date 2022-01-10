import { Aside } from '../../components/Aside';
import { ProductsList } from '../../components/ProductsList';

const Home = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Aside />
      <ProductsList />
    </div>
  );
};

export { Home };
