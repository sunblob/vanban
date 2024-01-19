import { Context, MiddlewareHandler, Next } from 'hono';
import { env } from 'hono/adapter';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';
import { createMiddleware } from 'hono/factory';

export const auth = (): MiddlewareHandler => {
  return async function auth(c: Context, next: Next) {
    const token = c.req.header('Authorization');

    if (!token) {
      throw new HTTPException(401, {
        message: 'Unauthorized',
      });
    }

    const decodedPayload = await verify(token, env<{ JWT_SECRET: string }>(c).JWT_SECRET, 'HS512');

    if (!decodedPayload) {
      throw new HTTPException(401, {
        message: 'Unauthorized',
      });
    }

    c.set('userId', decodedPayload.sub);

    await next();
  };
};

export const getUser = (c: Context) => {
  const userId = c.get('userId') as string;

  return userId;
};

// export const auth = createMiddleware(async (c, next) => {
//   const token = c.req.header('Authorization');

//   if (!token) {
//     throw new HTTPException(401, {
//       message: 'Unauthorized',
//     });
//   }

//   const decodedPayload = await verify(token, env<{ JWT_SECRET: string }>(c).JWT_SECRET, 'HS512');

//   if (!decodedPayload) {
//     throw new HTTPException(401, {
//       message: 'Unauthorized',
//     });
//   }

//   c.set('userId', decodedPayload.sub);

//   await next();
// });
