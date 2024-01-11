import { Hono } from 'hono';
import { auth, getUser } from '@/middlewares/auth';
import { BoardService } from './board.service';
import { zValidator } from '@hono/zod-validator';
import { createBoardDto, updateBoardDto } from './board.dto';

export const boardRouter = new Hono();

boardRouter.get('/', auth(), async (c) => {
  const userId = getUser(c);
  const boards = await BoardService.getBoards(userId);

  return c.json(boards);
});

boardRouter.get('/:id', async (c) => {
  const userId = getUser(c);
  const boardId = c.req.param('id');

  const board = await BoardService.getBoard(userId, boardId);

  return c.json(board);
});

boardRouter.post('/', auth(), zValidator('json', createBoardDto), async (c) => {
  const userId = getUser(c);
  const data = c.req.valid('json');
  const board = await BoardService.createBoard(userId, data);

  return c.json(board);
});

boardRouter.patch('/:id', auth(), zValidator('json', updateBoardDto), async (c) => {
  const userId = getUser(c);
  const boardId = c.req.param('id');
  const data = c.req.valid('json');

  const board = await BoardService.updateBoard(userId, boardId, data);

  return c.json(board);
});

boardRouter.delete('/:id', auth(), async (c) => {
  const userId = getUser(c);
  const boardId = c.req.param('id');
  await BoardService.deleteBoard(userId, boardId);

  return c.json({
    message: 'Board deleted successfully',
  });
});
