import { z } from 'zod';
import { TAG } from '@prisma/client';

export const createCardDto = z.object({
  title: z.string().min(1).max(255),
  position: z.number().int().positive(),
  listId: z.string().uuid(),
});

export type CreateCardDto = z.infer<typeof createCardDto>;

export const updateCardDto = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  listId: z.string().uuid().optional(),
  tags: z.array(z.nativeEnum(TAG)).optional(),
  position: z.number().int().positive().optional(),
});

export type UpdateCardDto = z.infer<typeof updateCardDto>;

export const updateCardPositionDto = z.object({
  newPosition: z.number().int().positive(),
  listId: z.string().uuid(),
  newListId: z.string().uuid().optional(),
});

export type UpdateCardPositionDto = z.infer<typeof updateCardPositionDto>;

export const getCardsDto = z.object({
  listId: z.string().uuid().optional(),
  boardId: z.string().uuid().optional(),
});

export type GetCardsDto = z.infer<typeof getCardsDto>;
