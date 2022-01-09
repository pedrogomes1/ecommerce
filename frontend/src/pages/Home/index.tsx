import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import Aside from '../../components/Aside';

import * as S from './styles';

const Home = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Aside />

      <S.Products>
        {[0, 1, 2, 3, 4, 5].map((product, index) => (
          <S.Product key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://github.com/pedrogomes1.png"
                alt="green"
              />
              <CardContent>
                <Typography gutterBottom>
                  Camiseta Corinthians 2021/2022
                </Typography>
                <Typography fontWeight="bold" variant="h6">
                  R$100,00
                </Typography>
                <Typography fontWeight="bold" variant="caption">
                  ou 10x de R$10,00 sem juros
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
          </S.Product>
        ))}
      </S.Products>
    </div>
  );
};

export { Home };
