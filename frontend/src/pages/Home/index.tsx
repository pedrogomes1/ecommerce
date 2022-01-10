import { Aside } from '../../components/Aside';
import { ProductsList } from '../../components/ProductsList';

import * as S from './styles';

const Home = () => {
  return (
    <S.Container>
      <Aside />
      <ProductsList />
    </S.Container>
  );
};

export { Home };
