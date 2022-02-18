import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Header } from '.';
import { products } from '../../mocks/handlers';

const mockedUsedNavigate = jest.fn();
const mockedFetchProducts = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../contexts/products', () => ({
  useProducts: () => ({
    fetchProducts: mockedFetchProducts,
    status,
    products,
  }),
}));

describe('Header component', () => {
  it('should render a logo image from app', () => {
    render(<Header />);
    expect(screen.getByRole('img', { name: /App logo/i })).toBeInTheDocument();
  });

  it('should navigate to home page when logo image is clicked', async () => {
    render(<Header />);

    const logo = screen.getByRole('img', { name: /App logo/i });
    userEvent.click(logo);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });

  it('should render a text field input to search products by name', () => {
    render(<Header />);
    expect(screen.queryByLabelText('Nome do produto')).toBeInTheDocument();
  });

  it('should change its value when there is value entered', () => {
    render(<Header />);
    const input = screen.getByLabelText('Nome do produto') as HTMLInputElement;

    userEvent.type(input, 'Tenis');
    expect(input.value).toBe('Tenis');
  });

  it('should debounce method when new input value is entered with 800ms after typing', async () => {
    jest.useFakeTimers();
    render(<Header />);

    const MILLISECONDS_TIME = 800;

    const input = screen.getByLabelText('Nome do produto') as HTMLInputElement;

    userEvent.type(input, 'C');
    expect(mockedFetchProducts).not.toHaveBeenCalled();

    jest.advanceTimersByTime(MILLISECONDS_TIME);
    expect(mockedFetchProducts).toHaveBeenCalled();

    jest.clearAllTimers();
  });

  it('should call of the fetchProducts function when all value typed in the input is deleted', () => {
    render(<Header />);

    const input = screen.getByLabelText('Nome do produto') as HTMLInputElement;

    userEvent.type(input, 'Tenis');
    userEvent.clear(input);

    expect(input.value).toBe('');
    expect(mockedFetchProducts).toBeCalled();
  });

  it('should render a link button to go contact page', () => {
    render(<Header />);

    const contactRedirectButton = screen.getByRole('button', {
      name: /Contato/i,
    });

    userEvent.click(contactRedirectButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/contact');
  });
});
