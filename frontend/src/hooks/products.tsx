import {
  useState,
  useCallback,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import { api } from '../services/api';
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

const ProductsProvider = ({ children }: ProductProvider) => {
  const [products, setProducts] = useState<Products[]>([]);

  const fetchProducts = useCallback(async (categoryIds, name) => {
    const { data } = await api.get('/product', {
      params: {
        categories: categoryIds,
        name,
      },
    });
    setProducts(formatProductsData(data));
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProducts = () => {
  return useContext(ProductContext);
};

export { ProductsProvider, useProducts };
