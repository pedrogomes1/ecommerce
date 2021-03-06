import { useEffect } from 'react';
import {
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import { SkeletonProducts } from '../SkeletonProducts';
import { useProducts } from '../../contexts/products';
import { RequestStatus } from '../../types';

import * as S from './styles';

const skeletonProducts = Array.from({ length: 6 }, (_, index) => index);
const { error, loading, empty } = RequestStatus;

const ProductsList = () => {
  const { products, fetchProducts, status } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      {status === loading ? (
        <S.SkeletonContainer>
          {skeletonProducts.map((item) => (
            <SkeletonProducts key={item} />
          ))}
        </S.SkeletonContainer>
      ) : status === empty ? (
        <Typography variant="h6" margin="auto">
          Nenhum produto encontrado.
        </Typography>
      ) : status === error ? (
        <Typography variant="h6" margin="auto">
          Erro do servidor. Tente novamente mais tarde.
        </Typography>
      ) : (
        <S.Products>
          {products.map((product) => (
            <li key={product.id}>
              <S.CardProduct>
                <CardMedia
                  component="img"
                  height={250}
                  src={product.image_link}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom>{product.name}</Typography>
                  <Typography fontWeight="bold" variant="h6">
                    {product.priceFormatted}
                  </Typography>
                  <Typography fontWeight="bold" variant="caption">
                    {`ou ${product.maxParcelAmount}x de ${product.parcelValue} sem juros`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    startIcon={<AddShoppingCart />}
                    fullWidth
                  >
                    Adicionar
                  </Button>
                </CardActions>
              </S.CardProduct>
            </li>
          ))}
        </S.Products>
      )}
    </>
  );
};

export { ProductsList };
