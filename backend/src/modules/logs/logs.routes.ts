import { Hono } from 'hono';
import { auth } from '../../middlewares/auth';

export const logsRouter = new Hono();

logsRouter.get('/', auth(), async (c) => {
  return c.json({ logs: [] });
});

logsRouter.get('/:id', auth(), async (c) => {});

logsRouter.post('/', auth(), async (c) => {});

logsRouter.patch('/:id', auth(), async (c) => {});

logsRouter.delete('/:id', auth(), async (c) => {});
