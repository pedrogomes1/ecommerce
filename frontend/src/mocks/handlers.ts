import { rest } from 'msw';
import { baseURL } from '../services/api';
import { currencyFormatter } from '../utils/currency';

const MAX_PARCEL_AMOUNT = 10;

const URL_API_PRODUCTS = `${baseURL}/product`;
const URL_API_MESSAGES = `${baseURL}/message`;
const URL_API_CATETORIES = `${baseURL}/category`;

const messages = [
  {
    id: 'b6acc613-1792-43a4-8cca-78fd943648fe',
    email: 'johndoe@hotmail.com',
    message: 'Os produtos são ótimos!',
    created_at: '2022-01-11T01:37:13.332Z',
  },
  {
    id: 'c15746ac-a67a-42ae-a363-059a25f61af5',
    email: 'janedoe@gmail.com',
    message: 'Qualidade e entrega mais rápida do Brasil! ',
    created_at: '2022-01-11T02:23:31.360Z',
  },
];

export const products = [
  {
    id: 'b3a541e7-334b-4cfb-be89-eb92b9aacb5b',
    name: 'Camiseta Corinthians 2020/2021',
    price: '100',
    image_link:
      'https://res.cloudinary.com/dohrhcaly/image/upload/v1641777518/ecommerce/camiseta-corinthians_gflsp4.webp',
    priceFormatted: currencyFormatter(100),
    maxParcelAmount: MAX_PARCEL_AMOUNT,
    parcelValue: currencyFormatter(100 / MAX_PARCEL_AMOUNT),
  },
  {
    id: '3c30d849-9750-4983-a4ba-d401bb66d165',
    name: 'Camiseta Flamengo 2020/2021',
    price: '159.9',
    image_link:
      'https://res.cloudinary.com/dohrhcaly/image/upload/v1641777519/ecommerce/camiseta-flamengo_ur6vur.webp',
    priceFormatted: currencyFormatter(159.9),
    maxParcelAmount: MAX_PARCEL_AMOUNT,
    parcelValue: currencyFormatter(159.9 / MAX_PARCEL_AMOUNT),
  },
  {
    id: 'cd701a21-6981-4562-aa8a-d7330b4614a1',
    name: 'Camiseta Seleção Brasileira Oficial',
    price: '199.9',
    image_link:
      'https://res.cloudinary.com/dohrhcaly/image/upload/v1641777518/ecommerce/camista-brasil_zz2qny.webp',
    priceFormatted: currencyFormatter(199.9),
    maxParcelAmount: MAX_PARCEL_AMOUNT,
    parcelValue: currencyFormatter(199.9 / MAX_PARCEL_AMOUNT),
  },
];

const categories = [
  {
    id: '59eebdf8-4ee3-4a91-b7f9-d08ed57ec560',
    name: 'Camisetas2',
    created_at: '2022-01-10T12:03:37.595Z',
  },
  {
    id: '5660d183-525f-4437-b66d-b4bd58a61f30',
    name: 'Tênis',
    created_at: '2022-01-10T12:03:43.710Z',
  },
  {
    id: 'e36e164d-2cc6-413f-9c2a-794cf6e9d71c',
    name: 'Bermudas',
    created_at: '2022-01-10T12:03:50.415Z',
  },
];

const fetchProducts = rest.get(
  URL_API_PRODUCTS,
  async (request, response, context) => response(context.json(products)),
);

const fetchMessages = rest.get(
  URL_API_MESSAGES,
  async (request, response, context) => response(context.json(messages)),
);

const fetchCategories = rest.get(
  URL_API_CATETORIES,
  async (request, response, context) => response(context.json(categories)),
);

const createMessage = rest.post(
  URL_API_MESSAGES,
  async (request, response, context) => response(context.json(messages[0])),
);

export const handlers = [
  fetchProducts,
  fetchMessages,
  fetchCategories,
  createMessage,
];
