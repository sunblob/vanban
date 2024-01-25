import { defineStore } from 'pinia';
import { useAuth } from './auth';
import { NetClient } from '@/utils/http/net-client';
import type { CardWithList } from '@/types';

interface CardModalStore {
  id?: string;
  card?: CardWithList;
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
        const { data } = await NetClient.get<CardWithList>(`/api/cards/${this.id}`, {
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
