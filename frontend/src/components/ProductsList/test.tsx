import { RequestStatus } from '../../types';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ProductsList } from '.';

const mockedUsedNavigate = jest.fn();

const { error, loading, empty, success, idle } = RequestStatus;

let status = idle;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../contexts/products', () => ({
  useProducts: jest.fn(() => ({
    status,
    products: [],
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
});
