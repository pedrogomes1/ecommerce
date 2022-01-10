import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useProducts } from '../../hooks/products';

import * as S from './styles';

const ProductsList = () => {
  const { products } = useProducts();

  return (
    <>
      {!!products.length && (
        <S.Products>
          {products.map((product) => (
            <li key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
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
              </Card>
            </li>
          ))}
        </S.Products>
      )}
    </>
  );
};

export { ProductsList };
