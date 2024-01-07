import { Hono } from 'hono';

export const listRouter = new Hono();

listRouter.get('/', (c) => {
  return c.json({});
});

listRouter.get('/:id', (c) => {
  return c.json({});
});

listRouter.post('/', (c) => {
  return c.json({});
});

listRouter.patch('/:id', (c) => {
  return c.json({});
});

listRouter.delete('/:id', (c) => {
  return c.json({});
});
