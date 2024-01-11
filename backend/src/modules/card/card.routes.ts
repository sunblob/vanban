import { Hono } from 'hono';
import { auth, getUser } from '@/middlewares/auth';
import { zValidator } from '@hono/zod-validator';
import { createCardDto, getCardsDto, updateCardDto, updateCardPositionDto } from './card.dto';
import { CardService } from './card.service';

export const cardRouter = new Hono();

cardRouter.get('/', auth(), zValidator('query', getCardsDto), async (c) => {
  const query = c.req.valid('query');
  const cards = await CardService.getCards(query);

  return c.json(cards);
});

cardRouter.get('/:id', auth(), async (c) => {
  const cardId = c.req.param('id');
  const card = await CardService.getCard(cardId);

  return c.json(card);
});

cardRouter.post('/', auth(), zValidator('json', createCardDto), async (c) => {
  const userId = getUser(c);
  const data = c.req.valid('json');
  const card = await CardService.createCard(userId, data);

  return c.json(card);
});

cardRouter.patch('/:id', auth(), zValidator('json', updateCardDto), async (c) => {
  const userId = getUser(c);
  const data = c.req.valid('json');
  const cardId = c.req.param('id');
  const card = await CardService.updateCard(userId, cardId, data);

  return c.json(card);
});

cardRouter.delete('/:id', auth(), async (c) => {
  const userId = getUser(c);
  const cardId = c.req.param('id');
  const card = await CardService.deleteCard(userId, cardId);

  return c.json(card);
});

cardRouter.patch('/:id/reorder', auth(), zValidator('json', updateCardPositionDto), async (c) => {
  const userId = getUser(c);
  const data = c.req.valid('json');
  const cardId = c.req.param('id');
  const result = await CardService.reorderCard(userId, cardId, data);

  return c.json(result);
});
