import { ChangeEvent, useState } from 'react';
import {
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { AddShoppingCart } from '@mui/icons-material';

import * as S from './styles';

const Home = () => {
  const [state, setState] = useState({
    gilad: false,
    jason: false,
    antoine: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;

  return (
    <div style={{ display: 'flex' }}>
      <S.Aside>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Categorias
        </Typography>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={gilad}
                  onChange={handleChange}
                  name="gilad"
                />
              }
              label="Camisetas"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={jason}
                  onChange={handleChange}
                  name="jason"
                />
              }
              label="Tênis"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={antoine}
                  onChange={handleChange}
                  name="antoine"
                />
              }
              label="Bermuda"
            />
          </FormGroup>
        </FormControl>
      </S.Aside>

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
