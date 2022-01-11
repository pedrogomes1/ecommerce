import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, TextField, InputAdornment } from '@mui/material';
import Search from '@mui/icons-material/Search';

import { useProducts } from '../../hooks/products';

import * as S from './styles';

const MILLISECONDS_TIME = 800;

const Header = () => {
  const [productName, setProductName] = useState('');

  const { fetchProducts } = useProducts();

  const handleChangeProductName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    return value ? setProductName(value) : fetchProducts([], '');
  };

  useEffect(() => {
    if (productName) {
      const debounceFetchProducts = setTimeout(() => {
        fetchProducts([], productName);
      }, MILLISECONDS_TIME);

      return () => clearTimeout(debounceFetchProducts);
    }
  }, [productName, fetchProducts]);

  return (
    <S.Header>
      <Typography variant="h4">Dio Shopping</Typography>
      <TextField
        label="Nome do produto"
        variant="outlined"
        onChange={handleChangeProductName}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Link to="/contact">
        <Button color="primary">Contato</Button>
      </Link>
    </S.Header>
  );
};

export { Header };
