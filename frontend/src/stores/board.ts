import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import { useAuth } from './auth';
import { NetClient } from '@/http/net-client';
import type { Board } from '@/types';

interface BoardStore {
  boards: Board[];
  currentBoard?: Board;
}

export const useBoardStore = defineStore('board', {
  state: (): BoardStore => ({
    boards: [],
    currentBoard: undefined,
  }),

  actions: {
    async getBoards() {
      try {
        const { data } = await NetClient.get<Board[]>(`/api/boards`, {
          headers: {
            Authorization: useAuth().token,
          },
        });

        this.boards = data;
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error getting boards');
      }
    },

    async getBoard(boardId: string) {
      try {
        const { data } = await NetClient.get<Board>(`/api/boards/${boardId}`, {
          headers: {
            Authorization: useAuth().token,
          },
        });

        this.currentBoard = data;
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error getting board');
      }
    },

    async createBoard({
      title,
      image,
      previewImage,
    }: {
      title: string;
      image?: string;
      previewImage?: string;
    }) {
      try {
        const { data } = await NetClient.post<Board>(
          `/api/boards`,
          {
            title,
            image,
            previewImage,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.getBoards();
        toast.success('Board created');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error creating board');
      }
    },

    async updateBoard({
      boardId,
      title,
      image,
    }: {
      boardId: string;
      title: string;
      image?: string;
    }) {
      try {
        const { data } = await NetClient.patch<Board>(
          `/api/boards/${boardId}`,
          {
            title,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.getBoard(boardId);
        toast.success('Board title updated');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error updating board');
      }
    },

    async deleteBoard(boardId: string) {
      try {
        await NetClient.delete(`/api/boards/${boardId}`, {
          headers: {
            Authorization: useAuth().token,
          },
        });

        this.getBoards();
        toast.success('Board deleted');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error deleting board');
      }
    },

    //lists
    async createList({
      boardId,
      title,
      position,
    }: {
      boardId: string;
      title: string;
      position: number;
    }) {
      try {
        await NetClient.post(
          `/api/lists`,
          {
            title,
            boardId,
            position,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.getBoard(this.currentBoard!.id);
        toast.success('List created');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error creating list');
      }
    },

    async updateList(listId: string, title: string) {
      try {
        await NetClient.patch(
          `/api/lists/${listId}`,
          {
            title,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.getBoard(this.currentBoard!.id);
        toast.success('List updated');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error updating list');
      }
    },

    async deleteList(listId: string) {
      try {
        await NetClient.delete(`/api/lists/${listId}`, {
          headers: {
            Authorization: useAuth().token,
          },
        });

        this.getBoard(this.currentBoard!.id);
        toast.success('List deleted');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error deleting list');
      }
    },

    async copyList(listId: string) {
      try {
        await NetClient.post(
          `/api/lists/${listId}/copy`,
          {},
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.getBoard(this.currentBoard!.id);
        toast.success('List copied');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error copying list');
      }
    },

    async updateListPosition({
      boardId,
      listId,
      newPosition,
    }: {
      boardId: string;
      listId: string;
      newPosition: number;
    }) {
      try {
        await NetClient.patch(
          `/api/lists/${listId}/reorder`,
          {
            newPosition,
            boardId,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.getBoard(this.currentBoard!.id);
        toast.success('List moved');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error updating list');
      }
    },

    // cards
    async createCard({
      listId,
      title,
      description,
      position,
    }: {
      listId: string;
      title: string;
      description?: string;
      position: number;
    }) {
      try {
        const { data } = await NetClient.post(
          `/api/cards`,
          {
            title,
            description,
            listId,
            position,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.getBoard(this.currentBoard!.id);
        toast.success('Card created');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error creating card');
      }
    },

    async updateCard({
      id,
      title,
      description,
    }: {
      id: string;
      title?: string;
      description?: string;
    }) {
      try {
        await NetClient.patch(
          `/api/cards/${id}`,
          {
            title,
            description,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.getBoard(this.currentBoard!.id);
        toast.success('Card updated');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error updating card');
      }
    },

    async deleteCard(cardId: string) {
      try {
        await NetClient.delete(`/api/cards/${cardId}`, {
          headers: {
            Authorization: useAuth().token,
          },
        });

        this.getBoard(this.currentBoard!.id);
        toast.success('Card deleted');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error deleting card');
      }
    },

    async copyCard(cardId: string) {
      try {
        await NetClient.post(
          `/api/cards/${cardId}/copy`,
          {},
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.getBoard(this.currentBoard!.id);
        toast.success('Card copied');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error copying card');
      }
    },

    async updateCardPosition({
      cardId,
      newPosition,
      listId,
      newListId,
    }: {
      cardId: string;
      newPosition: number;
      listId: string;
      newListId?: string;
    }) {
      try {
        await NetClient.patch(
          `/api/cards/${cardId}/reorder`,
          {
            newPosition,
            listId,
            newListId,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.getBoard(this.currentBoard!.id);
        toast.success('Card moved');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error updating card');
      }
    },
  },
});
