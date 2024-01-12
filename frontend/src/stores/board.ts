import type { Board, ID } from '@/types';
import axios from 'axios';
import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import { useAuth } from './auth';

interface Store {
  boards: Board[];
}

export const useBoardStore = defineStore('board', {
  state: (): Store => ({
    boards: [],
  }),

  actions: {
    async getBoards() {
      try {
        const { data } = await axios.get<Board[]>('http://localhost:3000/api/boards', {
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

    async createBoard({ title, image }: { title: string; image?: string }) {
      try {
        const { data } = await axios.post<Board>(
          'http://localhost:3000/api/boards',
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

    async updateBoard({ boardId, title, image }: { boardId: ID; title: string; image?: string }) {
      try {
        const { data } = await axios.put<Board>(
          `http://localhost:3000/api/boards/${boardId}`,
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

    async deleteBoard(boardId: ID) {
      try {
        await axios.delete(`http://localhost:3000/api/boards/${boardId}`, {
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
  },
});
