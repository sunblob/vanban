import { defineStore } from 'pinia';

interface VanbanCardModal {
  isOpen: boolean;
}

export const useCardModalStore = defineStore('card-modal', {
  state: (): VanbanCardModal => ({
    isOpen: false,
  }),
  actions: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
});
