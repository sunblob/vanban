import { HTTPException } from 'hono/http-exception';
import { prisma } from '@/utils/db';
import { CreateCardDto, GetCardsDto, UpdateCardDto, UpdateCardPositionDto } from './card.dto';
import { LogsService } from '../logs';

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
      include: {
        list: true,
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

    // create card log
    await LogsService.createLog(userId, {
      entityId: card.id,
      entityType: 'CARD',
      action: 'CREATE',
    });

    return card;
  }

  static async updateCard(
    userId: string,
    cardId: string,
    { title, description, listId, tags, position }: UpdateCardDto
  ) {
    const card = await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        title,
        description,
        listId,
        tags,
        position,
      },
    });

    // update card log
    await LogsService.createLog(userId, {
      entityId: cardId,
      entityType: 'CARD',
      action: 'UPDATE',
    });

    return card;
  }

  static async deleteCard(userId: string, cardId: string) {
    const card = await prisma.card.delete({
      where: {
        id: cardId,
      },
    });

    // delete card log
    await LogsService.createLog(userId, {
      entityId: cardId,
      entityType: 'CARD',
      action: 'DELETE',
    });

    return card;
  }

  static async reorderCard(userId: string, cardId: string, { newPosition, listId, newListId }: UpdateCardPositionDto) {
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

    if (diffPosition === 0 && card.listId === newListId) {
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
            decrement: 1,
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
            increment: 1,
          },
        },
      });
    }

    // if card is moved to a new list to a new position, decrement the position of the cards in the old list
    if (card.listId !== newListId) {
      await prisma.card.updateMany({
        where: {
          listId: card.listId,
          position: {
            gt: card.position,
          },
        },
        data: {
          position: {
            decrement: 1,
          },
        },
      });
    }

    // if card is moved to a new list to the same position, increment the position of the cards in the new list
    if (card.listId !== newListId && diffPosition === 0) {
      await prisma.card.updateMany({
        where: {
          listId: newListId,
          position: {
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

    // update card position and list
    await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        position: newPosition,
        listId: newListId,
      },
    });

    await LogsService.createLog(userId, {
      entityId: cardId,
      entityType: 'CARD',
      action: 'MOVE',
    });

    return {
      message: 'Card reordered',
    };
  }
}
