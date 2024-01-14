import { z } from 'zod';

export const getListsDto = z.object({
  boardId: z.string().uuid().optional(),
});

export type GetListsDto = z.infer<typeof getListsDto>;

export const createListDto = z.object({
  title: z.string().min(1).max(255),
  position: z.number().int().min(0),
  boardId: z.string().uuid(),
});

export type CreateListDto = z.infer<typeof createListDto>;

export const updateListDto = z.object({
  title: z.string().min(1).max(255).optional(),
  position: z.number().int().min(0).optional(),
});

export type UpdateListDto = z.infer<typeof updateListDto>;

export const updateListPositionDto = z.object({
  newPosition: z.number().int().min(0).positive(),
  boardId: z.string().uuid(),
});

export type UpdateListPositionDto = z.infer<typeof updateListPositionDto>;
