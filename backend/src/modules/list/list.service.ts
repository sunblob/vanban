import { HTTPException } from 'hono/http-exception';
import { prisma } from '../../utils/db';
import { UpdateListPositionDto } from './list.dto';

export class ListService {
  static async getLists(userId: string, boardId?: string) {
    const lists = await prisma.list.findMany({
      where: {
        board: {
          users: {
            some: {
              userId,
            },
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    });

    return lists;
  }

  static async reorderList(userId: string, listId: string, { newPosition, boardId }: UpdateListPositionDto) {
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

    if (newPosition === list.position) {
      return list;
    }

    if (newPosition > list.position) {
      
    }
  }
}
