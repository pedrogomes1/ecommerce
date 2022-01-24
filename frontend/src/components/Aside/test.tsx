import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Aside } from '.';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Aside component', () => {
  it('should render category title', () => {
    render(<Aside />, {
      wrapper: MemoryRouter,
    });
    expect(
      screen.getByRole('heading', { name: /Categorias/i }),
    ).toBeInTheDocument();
  });
});
