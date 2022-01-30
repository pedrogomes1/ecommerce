import { RequestStatus } from '../../types';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ProductsList } from '.';

const mockedUsedNavigate = jest.fn();

const { error, loading, empty, success, idle } = RequestStatus;

const status = idle;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../contexts/products', () => ({
  useProducts: jest.fn(() => ({
    status,
    products: [],
  })),
}));

describe('ProductsList component', () => {});
