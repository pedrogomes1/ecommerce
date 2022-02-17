import { Aside } from '../../components/Aside';
import { Header } from '../../components/Header';
import { ProductsList } from '../../components/ProductsList';

import * as S from './styles';

const Home = () => {
  return (
    <>
      <Header />
      <S.Container>
        <Aside />
        <ProductsList />
      </S.Container>
    </>
  );
};

export { Home };
