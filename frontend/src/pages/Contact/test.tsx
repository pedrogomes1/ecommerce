import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Contact } from '.';

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

  it('should display error alert when form values ​​are not filled and submit is clicked', () => {
    render(<Contact />, { wrapper: MemoryRouter });

    const submitButton = screen.getByRole('button', { name: /Enviar/i });
    fireEvent.click(submitButton);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should display list of registered messages', async () => {
    render(<Contact />, { wrapper: MemoryRouter });

    await waitFor(() => {
      const list = screen.getByRole('list');
      const email = screen.getAllByRole('heading')[0];
      const message = screen.getAllByTestId('test-message')[0];
      const date = screen.getAllByTestId('test-date')[0];

      expect(list).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(message).toBeInTheDocument();
      expect(date).toBeInTheDocument();
    });
  });
});