import { Hono } from 'hono';

export const boardRouter = new Hono();

boardRouter.get('/', (c) => {
  return c.json({});
});

boardRouter.get('/:id', (c) => {
  return c.json({});
});

boardRouter.post('/', (c) => {
  return c.json({});
});

boardRouter.patch('/:id', (c) => {
  return c.json({});
});

boardRouter.delete('/:id', (c) => {
  return c.json({});
});
