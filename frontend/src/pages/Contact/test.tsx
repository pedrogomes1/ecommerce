import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Contact } from '.';

const mockedTest = jest.fn(() => Promise.resolve(true));

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: mockedTest,
}));

jest.mock('../../contexts/products', () => ({
  useProducts: jest.fn(() => ({
    fetchProducts: jest.fn(),
  })),
}));

describe('Contact page', () => {
  it('should render form elements', () => {
    render(<Contact />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
  });
});
