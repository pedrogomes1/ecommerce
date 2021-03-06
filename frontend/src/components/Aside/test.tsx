import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    userEvent.click(firstCheckbox);

    expect(firstCheckbox).toBeChecked();
  });
});
