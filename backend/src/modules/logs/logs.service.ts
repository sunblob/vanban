import { HTTPException } from 'hono/http-exception';
import { prisma } from '@/utils/db';
import { CreateLogDto, GetLogsDto, UpdateLogDto } from './logs.dto';

export class LogsService {
  static async getLogs({ userId, entityId }: GetLogsDto) {
    const logs = await prisma.log.findMany({
      where: {
        entityId,
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return logs;
  }

  static async getLog(logId: string) {
    const log = await prisma.log.findFirst({
      where: {
        id: logId,
      },
    });
    if (!log) {
      throw new HTTPException(404, {
        message: 'Log not found',
      });
    }

    return log;
  }

  static async createLog(userId: string, { entityId, action, entityType }: CreateLogDto) {
    const log = await prisma.log.create({
      data: {
        entityId,
        userId,
        entityType,
        action,
      },
    });

    return log;
  }

  static async updateLog(logId: string, { entityId, entityType, action }: UpdateLogDto) {
    const log = await prisma.log.update({
      where: {
        id: logId,
      },
      data: {
        entityId,
        entityType,
        action,
      },
    });

    return log;
  }

  static async deleteLog(logId: string) {
    const log = await prisma.log.delete({
      where: {
        id: logId,
      },
    });

    return log;
  }
}
