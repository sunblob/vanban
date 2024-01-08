import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { authDto } from './auth.dto';
import { AuthService } from './auth.service';
import { auth } from '../../middlewares/auth';

export const authRouter = new Hono();

authRouter.post('/login', zValidator('json', authDto), async (c) => {
  const data = c.req.valid('json');

  const result = await AuthService.login(data);

  return c.json({
    accessToken: result,
  });
});

authRouter.post('/register', zValidator('json', authDto), async (c) => {
  const data = c.req.valid('json');

  const result = await AuthService.register(data);

  return c.json({
    accessToken: result,
  });
});

authRouter.post('/logout', auth, (c) => {
  return c.json({
    message: 'Successfully logged out',
  });
});
