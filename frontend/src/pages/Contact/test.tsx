import { render, screen, fireEvent } from '@testing-library/react';
import { Contact } from '.';

const mockedTest = jest.fn(() => Promise.resolve(true));

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: mockedTest,
}));

jest.mock('../../contexts/products', () => ({
  useProducts: jest.fn(() => ({
    fetchProducts: jest.fn(),
  })),
}));

describe('Contact page', () => {});
