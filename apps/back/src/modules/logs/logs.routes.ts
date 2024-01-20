import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { auth, getUser } from '@/middlewares/auth';
import { createLogDto, getLogsDto } from './logs.dto';
import { LogsService } from './logs.service';

export const logsRouter = new Hono();

logsRouter.get('/', auth(), zValidator('query', getLogsDto), async (c) => {
  const query = c.req.valid('query');
  const logs = await LogsService.getLogs(query);

  return c.json(logs);
});

logsRouter.get('/:id', auth(), async (c) => {
  const logId = c.req.param('id');
  const log = await LogsService.getLog(logId);

  return c.json(log);
});

logsRouter.post('/', auth(), zValidator('json', createLogDto), async (c) => {
  const userId = getUser(c);
  const data = c.req.valid('json');
  const log = await LogsService.createLog(userId, data);

  return c.json(log);
});

logsRouter.patch('/:id', auth(), async (c) => {});

logsRouter.delete('/:id', auth(), async (c) => {});
