import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import axios from 'axios';
import { useAuth } from './auth';
import { BACKEND_URL } from '@/constants';
import type { Card } from '@/types';

export const useList = defineStore('list', {
  actions: {
    async createList({
      title,
      boardId,
      position,
    }: {
      title: string;
      boardId: string;
      position: number;
    }) {
      try {
        const { data } = await axios.post<Card>(
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

        return data;
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error creating list');
      }
    },

    async updateList({ id, title }: { id: string; title: string }) {
      try {
        await axios.put<Card>(
          `${BACKEND_URL}/api/lists/${id}`,
          {
            title: title,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );

        toast.success('List updated');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error updating list');
      }
    },

    async deleteList(listId: string) {
      try {
        await axios.delete(`${BACKEND_URL}/api/lists/${listId}`, {
          headers: {
            Authorization: useAuth().token,
          },
        });

        toast.success('List deleted');
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error deleting list');
      }
    },
  },
});
