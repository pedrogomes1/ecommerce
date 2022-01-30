import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Contact } from '.';

const mockedFetchMessages = jest.fn(() => Promise.resolve(true));

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: mockedFetchMessages,
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

  it('should update input values ​​when they change', async () => {
    render(<Contact />, { wrapper: MemoryRouter });

    const emailInput = screen.getByLabelText(/E-mail/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/Mensagem/i) as HTMLInputElement;

    fireEvent.change(emailInput, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(messageInput, { target: { value: 'Hello World' } });

    expect(emailInput.value).toBe('johndoe@example.com');
    expect(messageInput.value).toBe('Hello World');
  });
});
