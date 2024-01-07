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

const app = new Hono();

app.use('*', logger());
app.use('/api/*', cors());

app.route('/api/auth', authRouter);
app.route('/api/boards', boardRouter);

app.get('/env', (c) => {
  const { PORT } = env<{ PORT: number }>(c);

  return c.json({ PORT });
});

app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ error: err.message }, 500);
});

showRoutes(app);

export { app };
