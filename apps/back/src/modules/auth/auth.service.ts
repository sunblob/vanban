import { sign, verify } from 'hono/jwt';
import * as argon from 'argon2';
import { prisma } from '@/utils/db';
import { AuthDto, RefreshDto } from './auth.dto';
import { HttpError } from '@/utils/http-error';

export class AuthService {
  static async login({ email, password }: AuthDto) {
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpError(404, {
        message: 'User not found',
        reason: 'NOT_FOUND',
      });
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
      throw new HttpError(401, {
        message: 'Invalid credentials',
        reason: 'BAD_REQUEST',
      });
    }

    const payload = {
      sub: user.id,
      email: user.email,
      type: 'access',
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    const refreshPayload = {
      sub: user.id,
      email: user.email,
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    };

    const token = await sign(payload, process.env.JWT_SECRET, 'HS512');
    const refreshToken = await sign(refreshPayload, process.env.JWT_SECRET, 'HS512');

    return {
      accessToken: token,
      refreshToken,
      email: user.email,
    };
  }

  static async register({ email, password }: AuthDto) {
    console.log('email: ', email);

    const hashedPassword = await argon.hash(password);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    const payload = {
      sub: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    const refreshPayload = {
      sub: user.id,
      email: user.email,
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    };

    const token = await sign(payload, process.env.JWT_SECRET, 'HS512');
    const refreshToken = await sign(refreshPayload, process.env.JWT_SECRET, 'HS512');

    return {
      accessToken: token,
      refreshToken,
      email: user.email,
    };
  }

  static async refreshToken({ refreshToken }: RefreshDto) {
    const decoded = await verify(refreshToken, process.env.JWT_SECRET);

    if (!decoded) {
      throw new HttpError(401, {
        message: 'Invalid token',
        reason: 'INVALID_TOKEN',
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },
    });

    if (!user) {
      throw new HttpError(404, {
        message: 'Unathorized access',
        reason: 'UNAUTHORIZED',
      });
    }

    const payload = {
      sub: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    const refreshPayload = {
      sub: user.id,
      email: user.email,
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    };

    const token = await sign(payload, process.env.JWT_SECRET, 'HS512');
    const refresh = await sign(refreshPayload, process.env.JWT_SECRET, 'HS512');

    return {
      accessToken: token,
      refreshToken: refresh,
      email: user.email,
    };
  }

  static async checkToken(token: string) {
    try {
      const decoded = await verify(token, process.env.JWT_SECRET, 'HS512');

      if (!decoded) {
        throw new HttpError(401, {
          message: 'Invalid token',
          reason: 'INVALID_TOKEN',
        });
      }

      return {
        message: 'Token is valid',
      };
    } catch (error) {
      throw new HttpError(401, {
        message: 'Invalid token',
        reason: 'INVALID_TOKEN',
      });
    }
  }
}
