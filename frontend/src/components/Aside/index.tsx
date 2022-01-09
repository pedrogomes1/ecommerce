import { ChangeEvent, useState, useEffect } from 'react';
import {
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Search from '@mui/icons-material/Search';
import axios from 'axios';

import * as S from './styles';

type CategoryProps = Array<{
  id: string;
  name: string;
  checked: boolean;
}>;

const getParamsFormatted = (categories: CategoryProps) => {
  const categoryIds = categories
    .filter(({ checked }) => checked)
    .map((item) => item.id);
  return categoryIds;
};

const Aside = () => {
  const [categories, setCategories] = useState<CategoryProps>([]);
  const [name, setName] = useState('');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const categoriesUpdated = categories.map((category, idx) => ({
      ...category,
      checked: index === idx ? event.target.checked : category.checked,
    }));
    setCategories(categoriesUpdated);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/product', {
        params: {
          categories: getParamsFormatted(categories),
          name,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, [categories, name]);

  useEffect(() => {
    axios.get('http://localhost:5000/category').then((res) => {
      setCategories(
        res.data.map(({ name, id }: { name: string; id: string }) => ({
          name,
          id,
          checked: false,
        })),
      );
    });
  }, []);

  return (
    <S.Aside>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Categorias
      </Typography>

      <TextField
        label="Nome do produto"
        variant="outlined"
        onChange={(event) => setName(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          {categories.length > 0 &&
            categories.map((category: any, index) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    onChange={(event) => handleChange(event, index)}
                    name={category.id}
                  />
                }
                label={category.name}
              />
            ))}
        </FormGroup>
      </FormControl>
    </S.Aside>
  );
};

export default Aside;
