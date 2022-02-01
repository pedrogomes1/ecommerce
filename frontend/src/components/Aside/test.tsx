import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Aside } from '.';

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

    const checkboxInputElement = await screen.findAllByRole('checkbox');

    const firstCheckbox = checkboxInputElement[0];

    expect(firstCheckbox).toBeInTheDocument();
    expect(firstCheckbox).not.toBeChecked();

    fireEvent.click(firstCheckbox);

    expect(firstCheckbox).toBeChecked();
  });
});
