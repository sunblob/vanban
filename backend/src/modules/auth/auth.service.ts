import { HTTPException } from 'hono/http-exception';
import * as argon from 'argon2';
import { decode, sign, verify } from 'hono/jwt';
import { prisma } from '../../utils/db';
import { AuthDto } from './auth.dto';

export class AuthService {
  static async login({ email, password }: AuthDto) {
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HTTPException(404, {
        message: 'User not found',
      });
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
      throw new HTTPException(401, {
        message: 'Invalid credentials',
      });
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = sign(payload, process.env.JWT_SECRET, 'HS512');

    return token;
  }

  static async register({ email, password }: AuthDto) {
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
    };

    const token = sign(payload, process.env.JWT_SECRET, 'HS512');

    return token;
  }
}
