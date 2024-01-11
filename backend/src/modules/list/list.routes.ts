import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { auth, getUser } from '@/middlewares/auth';
import { createListDto, getListsDto, updateListDto, updateListPositionDto } from './list.dto';
import { ListService } from './list.service';

export const listRouter = new Hono();

listRouter.get('/', zValidator('query', getListsDto), auth(), async (c) => {
  const userId = getUser(c);
  const data = c.req.valid('query');
  const lists = await ListService.getLists(userId, data);

  return c.json(lists);
});

listRouter.get('/:id', auth(), async (c) => {
  const userId = getUser(c);
  const listId = c.req.param('id');
  const list = await ListService.getList(userId, listId);

  return c.json(list);
});

listRouter.post('/', auth(), zValidator('json', createListDto), async (c) => {
  const userId = getUser(c);
  const data = c.req.valid('json');
  const list = await ListService.createList(userId, data);

  return c.json(list);
});

listRouter.patch('/:id', auth(), zValidator('json', updateListDto), async (c) => {
  const userId = getUser(c);
  const listId = c.req.param('id');
  const data = c.req.valid('json');
  const list = await ListService.updateList(userId, listId, data);

  return c.json(list);
});

listRouter.delete('/:id', auth(), async (c) => {
  const userId = getUser(c);
  const listId = c.req.param('id');
  const list = await ListService.deleteList(userId, listId);

  return c.json(list);
});

listRouter.patch('/:id/reorder', auth(), zValidator('json', updateListPositionDto), async (c) => {
  const userId = getUser(c);
  const data = c.req.valid('json');
  const listId = c.req.param('id');
  const result = await ListService.reorderList(userId, listId, data);

  return c.json(result);
});
