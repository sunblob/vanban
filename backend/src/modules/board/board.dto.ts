import { z } from 'zod';

export const createBoardDto = z.object({
  title: z.string(),
});

export type CreateBoardDto = z.infer<typeof createBoardDto>;

export const updateBoardDto = z.object({
  title: z.string().optional(),
  isClosed: z.boolean().optional(),
});

export type UpdateBoardDto = z.infer<typeof updateBoardDto>;
