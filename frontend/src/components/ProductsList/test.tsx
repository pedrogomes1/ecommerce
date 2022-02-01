import { RequestStatus } from '../../types';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { currencyFormatter } from '../../utils/currency';
import { ProductsList } from '.';

const MAX_PARCEL_AMOUNT = 10;

const { error, loading, empty, success, idle } = RequestStatus;

const products = [
  {
    id: 'b3a541e7-334b-4cfb-be89-eb92b9aacb5b',
    name: 'Camiseta Corinthians 2020/2021',
    price: '100',
    image_link:
      'https://res.cloudinary.com/dohrhcaly/image/upload/v1641777518/ecommerce/camiseta-corinthians_gflsp4.webp',
    priceFormatted: currencyFormatter(100),
    maxParcelAmount: MAX_PARCEL_AMOUNT,
    parcelValue: currencyFormatter(100 / MAX_PARCEL_AMOUNT),
  },
  {
    id: '3c30d849-9750-4983-a4ba-d401bb66d165',
    name: 'Camiseta Flamengo 2020/2021',
    price: '159.9',
    image_link:
      'https://res.cloudinary.com/dohrhcaly/image/upload/v1641777519/ecommerce/camiseta-flamengo_ur6vur.webp',
    priceFormatted: currencyFormatter(159.9),
    maxParcelAmount: MAX_PARCEL_AMOUNT,
    parcelValue: currencyFormatter(159.9 / MAX_PARCEL_AMOUNT),
  },
  {
    id: 'cd701a21-6981-4562-aa8a-d7330b4614a1',
    name: 'Camiseta Seleção Brasileira Oficial',
    price: '199.9',
    image_link:
      'https://res.cloudinary.com/dohrhcaly/image/upload/v1641777518/ecommerce/camista-brasil_zz2qny.webp',
    priceFormatted: currencyFormatter(199.9),
    maxParcelAmount: MAX_PARCEL_AMOUNT,
    parcelValue: currencyFormatter(199.9 / MAX_PARCEL_AMOUNT),
  },
];

let status = idle;

jest.mock('../../contexts/products', () => ({
  useProducts: jest.fn(() => ({
    status,
    products,
  })),
}));

describe('ProductsList component', () => {
  it('should skeleton list when status is loading', () => {
    status = loading;
    render(<ProductsList />, { wrapper: MemoryRouter });

    expect(screen.getAllByRole('list')).toHaveLength(6);
  });

  it('should render no products found message when status is empty', () => {
    status = empty;
    render(<ProductsList />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole('heading', { name: /Nenhum produto encontrado/i }),
    ).toBeInTheDocument();
  });

  it('should render Server Error message. Please try again later when status is empty', () => {
    status = error;
    render(<ProductsList />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole('heading', {
        name: /Erro do servidor. Tente novamente mais tarde/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render products list when status is success', () => {
    status = success;
    render(<ProductsList />, { wrapper: MemoryRouter });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    expect(screen.getByText(/Camiseta Corinthians 2020/i)).toBeInTheDocument();
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
  });
});
