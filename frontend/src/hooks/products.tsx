import { useState, useCallback } from 'react';
import { api } from '../services/api';

type Products = {
  id: string;
  name: string;
  price: number;
  image_link: string;
};

const useProducts = () => {
  const [products, setProducts] = useState<Products[]>([]);

  const fetchProducts = useCallback(async (categoryIds) => {
    const { data } = await api.get('/product', {
      params: {
        categories: categoryIds,
      },
    });
    setProducts(data);
  }, []);

  return { products, fetchProducts };
};

export { useProducts };
