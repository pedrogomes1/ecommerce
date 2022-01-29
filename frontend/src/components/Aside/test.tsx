import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Aside } from '.';

const mockedUsedNavigate = jest.fn();

const mockedTest = jest.fn(() => Promise.resolve(true));

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: mockedTest,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../contexts/products', () => ({
  useProducts: jest.fn(() => ({
    fetchProducts: jest.fn(),
  })),
}));

describe('Aside component', () => {
  it('should render category title', () => {
    render(<Aside />, { wrapper: MemoryRouter });
    expect(
      screen.getByRole('heading', { name: /Categorias/i }),
    ).toBeInTheDocument();
  });

  it('must set checkbox to true when clickeds', async () => {
    render(<Aside />, { wrapper: MemoryRouter });

    const checkboxInputElement = await screen.findByRole('checkbox', {
      name: /camisetas/i,
    });

    expect(checkboxInputElement).toBeInTheDocument();
    expect(checkboxInputElement).not.toBeChecked();

    fireEvent.click(checkboxInputElement);

    expect(checkboxInputElement).toBeChecked();
  });
});
