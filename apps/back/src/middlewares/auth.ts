import { HttpError } from '@/utils/http-error';
import { Context, MiddlewareHandler, Next } from 'hono';
import { env } from 'hono/adapter';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';

export const auth = (): MiddlewareHandler => {
  return async function auth(c: Context, next: Next) {
    try {
      const token = c.req.header('Authorization');

      if (!token) {
        throw new HttpError(401, {
          message: 'Unauthorized',
          reason: 'UNAUTHORIZED',
        });
      }

      const decodedPayload = await verify(token, env<{ JWT_SECRET: string }>(c).JWT_SECRET, 'HS512');

      if (!decodedPayload) {
        throw new HttpError(401, {
          message: 'Unauthorized',
          reason: 'UNAUTHORIZED',
        });
      }

      c.set('userId', decodedPayload.sub);

      await next();
    } catch (e) {
      throw new HttpError(401, {
        message: 'Unauthorized',
        reason: 'TOKEN_EXPIRED',
      });
    }
  };
};

export const getUser = (c: Context) => {
  const userId = c.get('userId') as string;

  return userId;
};
