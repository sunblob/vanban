import { Hono } from 'hono';

export const cardRouter = new Hono();

cardRouter.get('/', (c) => {
  return c.json({});
});

cardRouter.get('/:id', (c) => {
  return c.json({});
});

cardRouter.post('/', (c) => {
  return c.json({});
});

cardRouter.patch('/:id', (c) => {
  return c.json({});
});

cardRouter.delete('/:id', (c) => {
  return c.json({});
});
