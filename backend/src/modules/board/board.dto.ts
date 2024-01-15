import { z } from 'zod';

export const createBoardDto = z.object({
  title: z.string(),
  image: z.string().optional(),
  previewImage: z.string().optional(),
});

export type CreateBoardDto = z.infer<typeof createBoardDto>;

export const updateBoardDto = z.object({
  title: z.string().optional(),
  isClosed: z.boolean().optional(),
});

export type UpdateBoardDto = z.infer<typeof updateBoardDto>;
