import type { Board, ID } from '@/types';
import axios from 'axios';
import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import { useAuth } from './auth';
import { BACKEND_URL } from '@/constants';

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
        const { data } = await axios.get<Board[]>(`${BACKEND_URL}/api/boards`, {
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
        const { data } = await axios.get<Board>(`${BACKEND_URL}/api/boards/${boardId}`, {
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

    async createBoard({ title, image }: { title: string; image?: string }) {
      try {
        const { data } = await axios.post<Board>(
          `${BACKEND_URL}/api/boards`,
          {
            title,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.boards.push(data);
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
        const { data } = await axios.patch<Board>(
          `${BACKEND_URL}/api/boards/${boardId}`,
          {
            title,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        this.boards = this.boards.map((board) => {
          if (board.id === boardId) {
            return data;
          }

          return board;
        });

        toast.success('Board updated');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error updating board');
      }
    },

    async deleteBoard(boardId: string) {
      try {
        await axios.delete(`${BACKEND_URL}/api/boards/${boardId}`, {
          headers: {
            Authorization: useAuth().token,
          },
        });

        this.boards = this.boards.filter((board) => board.id !== boardId);
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
        const { data } = await axios.post(
          `${BACKEND_URL}/api/lists`,
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
        const { data } = await axios.post(
          `${BACKEND_URL}/api/cards`,
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
      title: string;
      description?: string;
    }) {
      try {
        await axios.patch(
          `${BACKEND_URL}/api/cards/${id}`,
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
        toast.error('Error updating board');
      }
    },
  },
});
