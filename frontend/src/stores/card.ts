import { defineStore } from 'pinia';
import { useAuth } from './auth';
import axios from 'axios';
import { BACKEND_URL } from '@/constants';
import { toast } from 'vue-sonner';
import type { Card } from '@/types';

export const useCard = defineStore('card', {
  actions: {
    async createCard({
      title,
      listId,
      position,
    }: {
      title: string;
      listId: string;
      position: number;
    }) {
      try {
        const { data } = await axios.post<Card>(
          `${BACKEND_URL}/api/cards`,
          {
            title,
            listId,
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
        toast.error('Error creating card');
      }
    },

    async updateCard(card: Card) {
      try {
        await axios.put<Card>(
          `${BACKEND_URL}/api/cards/${card.id}`,
          {
            title: card.title,
            description: card.description,
            listId: card.listId,
          },
          {
            headers: {
              Authorization: useAuth().token,
            },
          },
        );
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error updating card');
      }
    },

    async deleteCard(cardId: string) {
      try {
        await axios.delete(`${BACKEND_URL}/api/cards/${cardId}`, {
          headers: {
            Authorization: useAuth().token,
          },
        });
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Error deleting card');
      }
    },
  },
});
