import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { formatCategories } from '../components/Aside/utils';
import { CategoryProps } from '../types';
import { api } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryProps>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/category');
      setCategories(formatCategories(data));
    } catch (error) {
      toast.error('Erro ao buscar as categorias');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, setCategories };
};
