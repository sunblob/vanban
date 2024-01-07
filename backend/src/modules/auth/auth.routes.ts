import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { authDto } from './auth.dto';

export const authRouter = new Hono();

authRouter.post('/login', zValidator('form', authDto), (c) => {
  const data = c.req.valid('form');

  return c.json({});
});

authRouter.post('/register', zValidator('form', authDto), (c) => {
  const data = c.req.valid('form');

  return c.json({});
});

authRouter.post('/logout', (c) => {
  return c.json({});
});
