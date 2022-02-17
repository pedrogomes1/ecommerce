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
    render(<Contact />, { wrapper: MemoryRouter });

    const list = await screen.findByRole('list');
    const email = await screen.findAllByRole('heading');
    const message = await screen.findAllByTestId('message');
    const date = await screen.findAllByTestId('date');

    const firsEmailText = email[0];
    const firstMessageText = message[0];
    const firstDateText = date[0];

    expect(list).toBeInTheDocument();
    expect(firsEmailText).toBeInTheDocument();
    expect(firstMessageText).toBeInTheDocument();
    expect(firstDateText).toBeInTheDocument();
  });
});
