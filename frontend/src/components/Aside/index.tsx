import { ChangeEvent, useState, useEffect } from 'react';
import {
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import { useProducts } from '../../contexts/products';
import { useCategories } from '../../hooks/useCategories';
import { getCategoryIds, getCheckedCategories } from './utils';

import * as S from './styles';

const Aside = () => {
  const [categoriesHasUpdated, setCategoriesHasUpdated] = useState(false);

  const { fetchProducts } = useProducts();
  const { categories, setCategories } = useCategories();

  useEffect(() => {
    if (categoriesHasUpdated) {
      const categoryIds = getCategoryIds(categories);
      fetchProducts(categoryIds);
    }
  }, [categories, categoriesHasUpdated, fetchProducts]);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    categoryId: string,
  ) => {
    const categoriesUpdated = getCheckedCategories(
      categories,
      categoryId,
      event,
    );
    setCategories(categoriesUpdated);
    setCategoriesHasUpdated(true);
  };

  return (
    <S.Aside>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Categorias
      </Typography>

      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  onChange={(event) => handleCheckboxChange(event, category.id)}
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

export { Aside };
