import { HTTPException } from 'hono/http-exception';
import { prisma } from '../../utils/db';
import { CreateCardDto, GetCardsDto, UpdateCardDto, UpdateCardPositionDto } from './card.dto';

export class CardService {
  static async getCards({ listId, boardId }: GetCardsDto) {
    const cards = await prisma.card.findMany({
      where: {
        listId,
        list: {
          boardId,
        },
      },
      orderBy: {
        position: 'asc',
      },
    });

    return cards;
  }

  static async getCard(cardId: string) {
    const card = await prisma.card.findFirst({
      where: {
        id: cardId,
      },
    });

    if (!card) {
      throw new HTTPException(404, {
        message: 'Card not found',
      });
    }

    return card;
  }

  static async createCard(userId: string, { title, position, listId }: CreateCardDto) {
    const card = await prisma.card.create({
      data: {
        title,
        position,
        listId,
        authorId: userId,
      },
    });

    return card;
  }

  static async updateCard(userId: string, cardId: string, { title, description, listId, tags }: UpdateCardDto) {
    const card = await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        title,
        description,
        listId,
        tags,
      },
    });

    return card;
  }

  static async deleteCard(userId: string, cardId: string) {
    const card = await prisma.card.delete({
      where: {
        id: cardId,
      },
    });

    return card;
  }

  static async reorderCard(userId: string, cardId: string, { newPosition, listId }: UpdateCardPositionDto) {
    const card = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
    });

    if (!card) {
      throw new HTTPException(404, {
        message: 'Card not found',
      });
    }

    const diffPosition = newPosition - card.position;

    if (diffPosition === 0 && card.listId === listId) {
      throw new HTTPException(400, {
        message: 'Card already in that position',
      });
    }

    if (diffPosition > 0) {
      await prisma.card.updateMany({
        where: {
          listId,
          position: {
            gte: card.position,
            lte: newPosition,
          },
        },
        data: {
          position: {
            increment: 1,
          },
        },
      });
    } else {
      await prisma.card.updateMany({
        where: {
          listId,
          position: {
            lte: card.position,
            gte: newPosition,
          },
        },
        data: {
          position: {
            decrement: 1,
          },
        },
      });
    }

    return {
      message: 'Card reordered',
    };
  }
}
