import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useProducts } from '../../contexts/products';

import { Header } from '.';

const mockedUsedNavigate = jest.fn();
const mockedFetchProducts = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../contexts/products', () => ({
  ...jest.requireActual('../../contexts/products'),
  useProducts: jest.fn(() => ({
    fetchProducts: mockedFetchProducts,
  })),
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

  it('Debounce method when new input value is entered with 800ms after typing', async () => {
    jest.useFakeTimers();
    const container = render(<Header />, {
      wrapper: MemoryRouter,
    });
    const {
      result: { current },
    } = renderHook(() => useProducts());

    const MILLISECONDS_TIME = 800;
    const fetchProducts = current.fetchProducts;

    const input = container.getByLabelText(
      'Nome do produto',
    ) as HTMLInputElement;

    userEvent.type(input, 'C');
    expect(fetchProducts).not.toHaveBeenCalled();

    jest.advanceTimersByTime(MILLISECONDS_TIME);
    expect(fetchProducts).toHaveBeenCalled();

    jest.clearAllTimers();
  });

  it('Call of the fetchProducts function when all value typed in the input is deleted', () => {
    const container = render(<Header />, {
      wrapper: MemoryRouter,
    });

    const input = container.getByLabelText(
      'Nome do produto',
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Tenis' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(mockedFetchProducts).toBeCalled();
  });

  it('Render a link button to go contact page', () => {
    render(<Header />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
