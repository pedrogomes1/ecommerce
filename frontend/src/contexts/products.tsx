import {
  useState,
  useCallback,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import toast from 'react-hot-toast';

import { api } from '../services/api';
import { RequestStatus } from '../types';
import { currencyFormatter } from '../utils/currency';

const MAX_PARCEL_AMOUNT = 10;

type Products = {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  maxParcelAmount: number;
  parcelValue: string;
  image_link: string;
};

type ProductContextData = {
  products: Products[];
  fetchProducts: (categoryIds?: string[], name?: string) => Promise<void>;
  status: RequestStatus;
};

export const ProductContext = createContext({} as ProductContextData);

type ProductProvider = {
  children: ReactNode;
};

const formatProductsData = (products: Products[]) => {
  return products.map((product) => ({
    ...product,
    priceFormatted: currencyFormatter(product.price),
    maxParcelAmount: MAX_PARCEL_AMOUNT,
    parcelValue: currencyFormatter(product.price / MAX_PARCEL_AMOUNT),
  }));
};

const { empty, loading, error, idle, success } = RequestStatus;

const ProductsProvider = ({ children }: ProductProvider) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [status, setStatus] = useState<RequestStatus>(idle);

  const fetchProducts = useCallback(async (categoryIds, name) => {
    setStatus(loading);
    try {
      const { data } = await api.get('/product', {
        params: {
          categories: categoryIds,
          name,
        },
      });
      const hasProducts = !!data.length;
      setProducts(formatProductsData(data));
      setStatus(hasProducts ? success : empty);
    } catch (err) {
      setStatus(error);
      toast.error('Erro ao buscar os produtos');
    }
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts, status }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProducts = () => {
  return useContext(ProductContext);
};

export { ProductsProvider, useProducts };
