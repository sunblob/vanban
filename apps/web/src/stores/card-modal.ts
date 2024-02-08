import { defineStore } from 'pinia';

interface CardModalStore {
  id?: string;
  isCardOpen: boolean;
}

export const useCardModal = defineStore('card-modal', {
  state: (): CardModalStore => ({
    id: undefined,
    isCardOpen: false,
  }),
  getters: {
    getId: (state) => state.id,
  },
  actions: {
    open(id: string) {
      this.id = id;
      this.isCardOpen = true;
    },
    close() {
      this.isCardOpen = false;
    },
  },
});
