import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Header } from '.';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Header component', () => {
  it('Render a logo image from app', () => {
    render(<Header />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByRole('img', { name: /App logo/i })).toBeInTheDocument();
  });

  it('Navigate to home page when logo image is clicked', async () => {
    render(<Header />, {
      wrapper: MemoryRouter,
    });

    const logo = screen.getByRole('img', { name: /App logo/i });
    userEvent.click(logo);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });

  it('Render a text field input to search products by name', () => {
    render(<Header />, {
      wrapper: MemoryRouter,
    });
    expect(screen.queryByLabelText('Nome do produto')).toBeInTheDocument();
  });

  it('Change its value when there is value entered', () => {
    const container = render(<Header />, {
      wrapper: MemoryRouter,
    });
    const input = container.getByLabelText(
      'Nome do produto',
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Tenis' } });
    expect(input.value).toBe('Tenis');
  });

  it('Render a link button to go contact page', () => {
    render(<Header />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
