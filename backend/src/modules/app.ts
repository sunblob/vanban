import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { HTTPException } from 'hono/http-exception';
import { showRoutes } from 'hono/dev';
import { env } from 'hono/adapter';
import 'dotenv/config';

// routes
import { authRouter } from './auth';
import { boardRouter } from './board';
import { auth, getUser } from '../middlewares/auth';
import { Prisma } from '@prisma/client';
import { listRouter } from './list/list.routes';

const app = new Hono();

app.use('*', logger(), cors());

app.route('/api/auth', authRouter);
app.route('/api/boards', boardRouter);
app.route('/api/lists', listRouter);

app.get('/env', auth, (c) => {
  const { PORT, JWT_SECRET } = env<{ PORT: number; JWT_SECRET: string }>(c);

  const userId = getUser(c);

  console.log('userId: ', userId);

  return c.json({ PORT, JWT_SECRET });
});

app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

app.onError((err, c) => {
  let message = 'Internal server error';

  if (err instanceof HTTPException) {
    message = err.message;
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    message = err.message;
  }

  return c.json({ error: err.message }, 500);
});

showRoutes(app);

export { app };
