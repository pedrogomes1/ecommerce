import { render, screen, fireEvent } from '@testing-library/react';
import { Aside } from '.';

jest.mock('../../contexts/products', () => ({
  useProducts: () => ({
    fetchProducts: jest.fn(),
  }),
}));

describe('Aside component', () => {
  it('should render category title', () => {
    render(<Aside />);
    expect(
      screen.getByRole('heading', { name: /Categorias/i }),
    ).toBeInTheDocument();
  });

  it('must set checkbox to true when clickeds', async () => {
    render(<Aside />);

    const checkboxInputElement = await screen.findAllByRole('checkbox');

    const firstCheckbox = checkboxInputElement[0];

    expect(firstCheckbox).toBeInTheDocument();
    expect(firstCheckbox).not.toBeChecked();

    fireEvent.click(firstCheckbox);

    expect(firstCheckbox).toBeChecked();
  });
});
