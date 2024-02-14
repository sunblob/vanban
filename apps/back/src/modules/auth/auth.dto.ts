import { z } from 'zod';

export const authDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AuthDto = z.infer<typeof authDto>;

export const refreshDto = z.object({
  refreshToken: z.string(),
});

export type RefreshDto = z.infer<typeof refreshDto>;

export const checkToken = z.object({
  token: z.string(),
});

export type CheckTokenDto = z.infer<typeof checkToken>;
