import type { Card, CardWithList } from '@/types';
import { NetClient } from '../http/net-client';

export class CardsApi {
  static async getCards(): Promise<Card[]> {
    const { data } = await NetClient.get<Card[]>('/api/cards');

    return data;
  }

  static async getCard(id: string) {
    const { data } = await NetClient.get<CardWithList>(`/api/cards/${id}`);

    return data;
  }

  static async createCard({
    title,
    position,
    listId,
  }: {
    title: string;
    position: number;
    listId: string;
  }): Promise<Card> {
    const { data } = await NetClient.post<Card>('/api/cards', { title, position, listId });

    return data;
  }

  static async updateCard(
    id: string,
    { title, position, description }: { title?: string; position?: number; description?: string },
  ): Promise<Card> {
    const { data } = await NetClient.patch<Card>(`/api/cards/${id}`, {
      title,
      position,
      description,
    });

    return data;
  }

  static async copyCard(id: string): Promise<Card> {
    const { data } = await NetClient.post<Card>(`/api/cards/${id}/copy`, {});

    return data;
  }

  static async deleteCard(id: string): Promise<void> {
    await NetClient.delete(`/api/cards/${id}`);
  }

  static async reorderCard(
    cardId: string,
    { newPosition, listId, newListId }: { newPosition: number; listId: string; newListId?: string },
  ) {
    await NetClient.patch(`/api/cards/${cardId}/reorder`, { newPosition, listId, newListId });
  }
}
