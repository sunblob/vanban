import { NetClient } from '../http/net-client';

import type { Board } from '@/types';

export class BoardsApi {
  static async getBoards(): Promise<Board[]> {
    const { data } = await NetClient.get<Board[]>('/api/boards');

    return data;
  }

  static async getBoard(id: string) {
    const { data } = await NetClient.get<Board>(`/api/boards/${id}`);

    return data;
  }

  static async createBoard({
    title,
    image,
    previewImage,
  }: {
    title: string;
    image: string;
    previewImage: string;
  }): Promise<Board> {
    const { data } = await NetClient.post<Board>('/api/boards', { title, image, previewImage });

    return data;
  }

  static async updateBoard(
    id: string,
    { title, isClosed }: { title?: string; isClosed?: boolean },
  ): Promise<Board> {
    const { data } = await NetClient.patch<Board>(`/api/boards/${id}`, {
      title,
      isClosed,
    });

    return data;
  }

  static async deleteBoard(id: string): Promise<void> {
    await NetClient.delete(`/api/boards/${id}`);
  }
}
