import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, InputAdornment } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { Mail } from '@mui/icons-material';

import logo from '../../assets/logo.webp';

import { useProducts } from '../../contexts/products';

import * as S from './styles';

const MILLISECONDS_TIME = 800;

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

  return (
    <S.Header>
      <S.Logo src={logo} alt="App logo" onClick={handleNavigateToHome} />
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
        <Button variant="outlined" color="primary" startIcon={<Mail />}>
          Contato
        </Button>
      </Link>
    </S.Header>
  );
};

export { Header };
