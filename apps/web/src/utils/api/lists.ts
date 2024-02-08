import type { List } from '@/types';
import { NetClient } from '../http/net-client';

export class ListsApi {
  static async getLists(): Promise<List[]> {
    const { data } = await NetClient.get<List[]>('/api/lists');

    return data;
  }

  static async getList(id: string) {
    const { data } = await NetClient.get<List>(`/api/lists/${id}`);

    return data;
  }

  static async createList({
    title,
    position,
    boardId,
  }: {
    title: string;
    position: number;
    boardId: string;
  }): Promise<List> {
    const { data } = await NetClient.post<List>('/api/lists', { title, position, boardId });

    return data;
  }

  static async updateList(
    id: string,
    { title, position, description }: { title?: string; position?: number; description?: string },
  ): Promise<List> {
    const { data } = await NetClient.patch<List>(`/api/lists/${id}`, {
      title,
      position,
      description,
    });

    return data;
  }

  static async copyList(id: string): Promise<List> {
    const { data } = await NetClient.post<List>(`/api/lists/${id}/copy`);

    return data;
  }

  static async deleteList(id: string): Promise<void> {
    await NetClient.delete(`/api/lists/${id}`);
  }

  static async reorderList(
    listId: string,
    { newPosition, boardId }: { newPosition: number; boardId: string },
  ) {
    await NetClient.patch(`/api/lists/${listId}/reorder`, { newPosition, boardId });
  }
}
