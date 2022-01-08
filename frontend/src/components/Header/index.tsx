import { Link } from 'react-router-dom';
import { Typography, Button, TextField, InputAdornment } from '@mui/material';
import Search from '@mui/icons-material/Search';

import * as S from './styles';

const Header = () => {
  return (
    <S.Header>
      <Typography variant="h4">Dio Shopping</Typography>
      <TextField
        label="Nome do produto"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Link to="/contato">
        <Button color="primary">Contato</Button>
      </Link>
    </S.Header>
  );
};

export { Header };
