import { HTTPException } from 'hono/http-exception';
import { prisma } from '@/utils/db';
import { CreateListDto, GetListsDto, UpdateListDto, UpdateListPositionDto } from './list.dto';
import { LogsService } from '../logs';

export class ListService {
  static async getLists(userId: string, { boardId }: GetListsDto) {
    const lists = await prisma.list.findMany({
      where: {
        boardId,
        board: {
          users: {
            some: {
              userId,
            },
          },
        },
      },
      include: {
        cards: {
          orderBy: {
            position: 'asc',
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    });

    return lists;
  }

  static async getList(userId: string, listId: string) {
    const list = await prisma.list.findFirst({
      where: {
        id: listId,
        board: {
          users: {
            some: {
              userId,
            },
          },
        },
      },
    });

    if (!list) {
      throw new HTTPException(404, {
        message: 'List not found',
      });
    }

    return list;
  }

  static async createList(userId: string, { title, position, boardId }: CreateListDto) {
    const list = await prisma.list.create({
      data: {
        title,
        position,
        boardId,
      },
    });

    // create list log
    await LogsService.createLog(userId, {
      entityId: list.id,
      entityType: 'LIST',
      action: 'CREATE',
    });

    return list;
  }

  static async updateList(userId: string, listId: string, { title, position }: UpdateListDto) {
    const list = await prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        title,
        position,
      },
    });

    // update list log
    await LogsService.createLog(userId, {
      entityId: list.id,
      entityType: 'LIST',
      action: 'UPDATE',
    });

    return list;
  }

  static async deleteList(userId: string, listId: string) {
    const list = await prisma.list.delete({
      where: {
        id: listId,
      },
    });

    // update other lists position on delete
    await prisma.list.updateMany({
      where: {
        boardId: list.boardId,
        position: {
          gt: list.position,
        },
      },
      data: {
        position: {
          decrement: 1,
        },
      },
    });

    // delete list log
    await LogsService.createLog(userId, {
      entityId: list.id,
      entityType: 'LIST',
      action: 'DELETE',
    });

    return list;
  }

  static async reorderList(listId: string, { newPosition, boardId }: UpdateListPositionDto) {
    const list = await prisma.list.findFirst({
      where: {
        id: listId,
        boardId,
      },
    });

    if (!list) {
      throw new HTTPException(404, {
        message: 'List not found',
      });
    }

    const diffPosition = newPosition - list.position;

    if (newPosition === list.position) {
      throw new HTTPException(400, {
        message: 'List already in that position',
      });
    }

    if (diffPosition > 0) {
      await prisma.list.updateMany({
        where: {
          boardId,
          position: {
            gte: list.position,
            lte: newPosition,
          },
        },
        data: {
          position: {
            decrement: 1,
          },
        },
      });
    } else {
      await prisma.list.updateMany({
        where: {
          boardId,
          position: {
            lte: list.position,
            gte: newPosition,
          },
        },
        data: {
          position: {
            increment: 1,
          },
        },
      });
    }

    await prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        position: newPosition,
      },
    });

    return {
      message: 'List reordered',
    };
  }
}
