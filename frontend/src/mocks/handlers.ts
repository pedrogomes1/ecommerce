import { rest } from 'msw';
import { baseURL } from '../services/api';

const URL_API_MESSAGES = `${baseURL}/message`;

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

const fetchMessages = rest.get(
  URL_API_MESSAGES,
  async (request, response, context) => response(context.json(messages)),
);

const createMessage = rest.post(
  URL_API_MESSAGES,
  async (request, response, context) => response(context.json(messages[0])),
);

export const handlers = [fetchMessages, createMessage];
