import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from '.';

describe('Contact page', () => {
  it('should render form elements', async () => {
    render(<Contact />);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
  });

  it('should update input values ​​when they change', async () => {
    render(<Contact />);

    const emailInput = screen.getByLabelText(/E-mail/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/Mensagem/i) as HTMLInputElement;

    userEvent.type(emailInput, 'johndoe@example.com');
    userEvent.type(messageInput, 'Hello World');

    expect(emailInput.value).toBe('johndoe@example.com');
    expect(messageInput.value).toBe('Hello World');
  });

  it('should display error alert when form values ​​are not filled and submit is clicked', () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /Enviar/i });
    userEvent.click(submitButton);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should display list of registered messages', async () => {
    render(<Contact />);

    const listMessages = await screen.findByRole('list');
    const email = await screen.findByText('johndoe@hotmail.com');
    const message = await screen.findByText('Os produtos são ótimos!');

    expect(listMessages).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
