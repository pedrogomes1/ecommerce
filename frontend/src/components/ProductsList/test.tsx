import { render, screen } from '@testing-library/react';
import { ProductsList } from '.';
import { RequestStatus } from '../../types';
import { products } from '../../mocks/handlers';

const { error, loading, empty, success, idle } = RequestStatus;

let status = idle;

jest.mock('../../contexts/products', () => ({
  useProducts: () => ({
    fetchProducts: jest.fn(),
    status,
    products,
  }),
}));

describe('ProductsList component', () => {
  it('should skeleton list when status is loading', async () => {
    status = loading;
    render(<ProductsList />);

    expect(screen.getAllByRole('list')).toHaveLength(6);
  });

  it('should render no products found message when status is empty', () => {
    status = empty;
    render(<ProductsList />);

    expect(
      screen.getByRole('heading', { name: /Nenhum produto encontrado/i }),
    ).toBeInTheDocument();
  });

  it('should render server error message when status is empty', () => {
    status = error;
    render(<ProductsList />);

    expect(
      screen.getByRole('heading', {
        name: /Erro do servidor. Tente novamente mais tarde/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render products list when status is success', async () => {
    status = success;
    render(<ProductsList />);

    expect(await screen.findByRole('list')).toBeInTheDocument();
    expect(await screen.findAllByRole('listitem')).toHaveLength(3);

    expect(screen.getByText(/Camiseta Corinthians 2020/i)).toBeInTheDocument();
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
  });
});
