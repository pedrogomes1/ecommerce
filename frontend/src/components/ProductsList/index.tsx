import {
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import { SkeletonProducts } from '../SkeletonProducts';
import { useProducts } from '../../hooks/products';

import * as S from './styles';

const skeletonProducts = [1, 2, 3, 4, 5, 6];

const ProductsList = () => {
  const { products } = useProducts();

  const hasProducts = !!products.length;

  return (
    <>
      {hasProducts ? (
        <S.Products>
          {products.map((product) => (
            <li key={product.id}>
              <S.CardProduct style={{ minWidth: '300px' }}>
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
      ) : (
        <S.SkeletonContainer>
          {skeletonProducts.map((item) => (
            <SkeletonProducts key={item} />
          ))}
        </S.SkeletonContainer>
      )}
    </>
  );
};

export { ProductsList };
