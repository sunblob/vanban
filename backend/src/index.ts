import { serve } from '@hono/node-server';
import { app } from './modules/app';

const port = 3000;

function bootstrap() {
  console.log(`Server is running on port ${port}`);

  serve({
    fetch: app.fetch,
    port,
  });
}

bootstrap();
