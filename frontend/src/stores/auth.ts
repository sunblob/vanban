import { defineStore } from 'pinia';

interface State {
  token: string | null;
  userId: string | null;
}

export const useAuth = defineStore('auth', {
  state: (): State => ({
    token: null,
    userId: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    login(token: string, userId: string) {
      this.token = token;
      this.userId = userId;
    },
    logout() {
      this.token = null;
      this.userId = null;
    },
  },
});
