import { HTTPException } from 'hono/http-exception';
import { prisma } from '../../utils/db';
import { CreateBoardDto, UpdateBoardDto } from './board.dto';

export class BoardService {
  static async getBoards(userId: string) {
    const boards = await prisma.board.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        lists: true,
      },
    });

    return boards;
  }

  static async getBoard(userId: string, boardId: string) {
    const board = await prisma.board.findFirst({
      where: {
        id: boardId,
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        lists: {
          include: {
            cards: true,
          },
        },
      },
    });

    if (!board) {
      throw new HTTPException(404, {
        message: 'Board not found',
      });
    }

    return board;
  }

  static async createBoard(userId: string, { title }: CreateBoardDto) {
    const board = await prisma.board.create({
      data: {
        title,
        authorId: userId,
        users: {
          create: {
            userId,
          },
        },
      },
    });

    return board;
  }

  static async updateBoard(userId: string, boardId: string, data: UpdateBoardDto) {
    const board = await prisma.board.findFirst({
      where: {
        id: boardId,
        authorId: userId,
      },
    });

    if (!board) {
      throw new HTTPException(404, {
        message: 'Board not found',
      });
    }

    const updatedBoard = await prisma.board.update({
      where: {
        id: boardId,
      },
      data,
    });

    return updatedBoard;
  }

  static async deleteBoard(userId: string, boardId: string) {
    const board = await prisma.board.findFirst({
      where: {
        id: boardId,
        authorId: userId,
      },
    });

    if (!board) {
      throw new HTTPException(404, {
        message: 'Board not found',
      });
    }

    await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
  }
}
