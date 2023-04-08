import { rest } from 'msw';
import { setupServer } from 'msw/node';
import products from '../assets/product.json';
const iphone = products[0];
const response = {
  products,
  skip: 0,
};

const handlers = [
  rest.get('https://dummyjson.com/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  }),
  rest.get('https://dummyjson.com/products/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(iphone));
  }),
];

export const mockServer = setupServer(...handlers);
