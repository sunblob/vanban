import { z } from 'zod';

export const createListDto = z.object({
  title: z.string().min(1).max(255),
  position: z.number().int().positive(),
  boardId: z.string().uuid(),
});

export type CreateListDto = z.infer<typeof createListDto>;

export const updateListDto = z.object({
  title: z.string().min(1).max(255).optional(),
  position: z.number().int().positive().optional(),
});

export type UpdateListDto = z.infer<typeof updateListDto>;

export const updateListPositionDto = z.object({
  newPosition: z.number().int().positive(),
  boardId: z.string().uuid(),
});

export type UpdateListPositionDto = z.infer<typeof updateListPositionDto>;
