import { z } from 'zod';
import { TAG } from '@prisma/client';

enum Tag {
  TASK = 'TASK',
  BUG = 'BUG',
  OTHER = 'OTHER',
}

export const createCardDto = z.object({
  title: z.string().min(1).max(255),
  position: z.number().int().positive(),
  listId: z.string().ulid(),
});

export type CreateCardDto = z.infer<typeof createCardDto>;

export const updateCardDto = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  listId: z.string().ulid().optional(),
  tags: z.array(z.nativeEnum(TAG)).optional(),
});

export type UpdateCardDto = z.infer<typeof updateCardDto>;

export const updateCardPositionDto = z.object({
  newPosition: z.number().int().positive(),
  listId: z.string().ulid(),
});

export type UpdateCardPositionDto = z.infer<typeof updateCardPositionDto>;

export const getCardsDto = z.object({
  listId: z.string().ulid().optional(),
  boardId: z.string().ulid().optional(),
});

export type GetCardsDto = z.infer<typeof getCardsDto>;
