import { z } from 'zod';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

export const getLogsDto = z.object({
  entityId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type GetLogsDto = z.infer<typeof getLogsDto>;

export const createLogDto = z.object({
  entityId: z.string().uuid(),
  entityType: z.nativeEnum(ENTITY_TYPE),
  action: z.nativeEnum(ACTION),
});

export type CreateLogDto = z.infer<typeof createLogDto>;

export const updateLogDro = z.object({
  entityId: z.string().uuid().optional(),
  entityType: z.nativeEnum(ENTITY_TYPE).optional(),
  action: z.nativeEnum(ACTION).optional(),
});

export type UpdateLogDto = z.infer<typeof updateLogDro>;
