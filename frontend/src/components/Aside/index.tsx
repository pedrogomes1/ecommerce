import { ChangeEvent, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useProducts } from '../../hooks/products';

import * as S from './styles';
import { api } from '../../services/api';

type CategoryProps = Array<{
  id: string;
  name: string;
  checked: boolean;
}>;

const getCategoryIds = (categories: CategoryProps) => {
  const categoryIds = categories
    .filter(({ checked }) => checked)
    .map((item) => item.id);
  return categoryIds;
};

const formatCategories = (categories: CategoryProps) => {
  return categories.map(({ id, name }) => ({
    id,
    name,
    checked: false,
  }));
};

const Aside = () => {
  const [categories, setCategories] = useState<CategoryProps>([]);

  const { fetchProducts } = useProducts();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/category');
        setCategories(formatCategories(data));
      } catch (error) {
        toast.error('Erro ao buscar as categorias');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length) {
      const categoryIds = getCategoryIds(categories);
      fetchProducts(categoryIds);
    }
  }, [fetchProducts, categories]);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    categoryId: string,
  ) => {
    const categoriesUpdated = categories.map((category) => ({
      ...category,
      checked:
        category.id === categoryId ? event.target.checked : category.checked,
    }));
    setCategories(categoriesUpdated);
  };

  return (
    <S.Aside>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Categorias
      </Typography>

      {!!categories.length && (
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    onChange={(event) =>
                      handleCheckboxChange(event, category.id)
                    }
                    name={category.id}
                  />
                }
                label={category.name}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
    </S.Aside>
  );
};

export { Aside };
