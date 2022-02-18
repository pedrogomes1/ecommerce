import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, InputAdornment } from '@mui/material';
import { Mail, Search } from '@mui/icons-material';

import { useProducts } from '../../contexts/products';

import * as S from './styles';

const MILLISECONDS_TIME = 800;
const LOGO_URL =
  'https://res.cloudinary.com/dohrhcaly/image/upload/v1642641776/ecommerce/logo_k4vauo.webp';

const Header = () => {
  const [productName, setProductName] = useState('');

  const navigate = useNavigate();
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

  const handleNavigateToHome = () => {
    navigate('/');
  };

  const handleNavigateToContact = () => {
    navigate('/contact');
  };

  return (
    <S.Header>
      <S.Logo src={LOGO_URL} alt="App logo" onClick={handleNavigateToHome} />
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
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Mail />}
        onClick={handleNavigateToContact}
      >
        Contato
      </Button>
    </S.Header>
  );
};

export { Header };
