import { Hono } from 'hono';
import { auth, getUser } from '../../middlewares/auth';

export const listRouter = new Hono();

listRouter.get('/', auth(), async (c) => {
  const userId = getUser(c);

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
