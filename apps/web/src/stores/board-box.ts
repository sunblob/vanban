import { defineStore } from 'pinia';

interface BoxModalStore {
  title: string;
  isBoxOpen: boolean;
}

export const useBoardBox = defineStore('boardBox', {
  state: (): BoxModalStore => ({
    title: '',
    isBoxOpen: false,
  }),
  actions: {
    open() {
      this.isBoxOpen = true;
    },
    close() {
      this.isBoxOpen = false;
    },
  },
});
