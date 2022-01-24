import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

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
  it('should render a logo image from app', () => {
    render(<Header />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByRole('img', { name: /App logo/i })).toBeInTheDocument();
  });

  it('should navigate to home page when logo image is clicked', async () => {
    render(<Header />, {
      wrapper: MemoryRouter,
    });

    const logo = screen.getByRole('img', { name: /App logo/i });
    userEvent.click(logo);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });

  it('should render a text field input to search products by name', () => {
    render(<Header />, {
      wrapper: MemoryRouter,
    });
    expect(screen.queryByLabelText('Nome do produto')).toBeInTheDocument();
  });

  it('should change its value when there is value entered', () => {
    const container = render(<Header />, {
      wrapper: MemoryRouter,
    });
    const input = container.getByLabelText(
      'Nome do produto',
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Tenis' } });
    expect(input.value).toBe('Tenis');
  });

  it('should debounce method when new input value is entered with 800ms after typing', async () => {
    jest.useFakeTimers();
    const container = render(<Header />, {
      wrapper: MemoryRouter,
    });

    const MILLISECONDS_TIME = 800;

    const input = container.getByLabelText(
      'Nome do produto',
    ) as HTMLInputElement;

    userEvent.type(input, 'C');
    expect(mockedFetchProducts).not.toHaveBeenCalled();

    jest.advanceTimersByTime(MILLISECONDS_TIME);
    expect(mockedFetchProducts).toHaveBeenCalled();

    jest.clearAllTimers();
  });

  it('should call of the fetchProducts function when all value typed in the input is deleted', () => {
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

  it('should render a link button to go contact page', () => {
    render(<Header />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
