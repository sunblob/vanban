import axios from 'axios';
import { defineStore } from 'pinia';
import { useAuth } from './auth';
import type { Card } from '@/types';
import { BACKEND_URL } from '@/constants';

interface CardModalStore {
  id?: string;
  card?: Card;
  isCardOpen: boolean;
}

export const useCardModal = defineStore('card-modal', {
  state: (): CardModalStore => ({
    id: undefined,
    card: undefined,
    isCardOpen: false,
  }),
  actions: {
    async loadCardInfo() {
      try {
        const { data } = await axios.get<Card>(`${BACKEND_URL}/api/cards/${this.id}`, {
          headers: { Authorization: useAuth().token },
        });

        this.card = data;
      } catch (err) {
        console.log(err);
      }
    },
    open(id: string) {
      this.id = id;
      this.isCardOpen = true;
    },
    close() {
      this.isCardOpen = false;
    },
  },
});
