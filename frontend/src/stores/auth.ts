import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import { NetClient } from '@/http/net-client';

interface AuthStore {
  token: string | null;
  email: string | null;
}

export const useAuth = defineStore('auth', {
  state: (): AuthStore => ({
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async register(email: string, password: string) {
      try {
        const { data } = await NetClient.post<{ accessToken: string; email: string }>(
          '/api/auth/register',
          {
            email,
            password,
          },
        );

        this.token = data.accessToken;
        this.email = data.email;
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('email', data.email);
      } catch (error) {
        console.log('Error: ', error);
        toast.error('User with this email already exists');
      }
    },
    async login(email: string, password: string) {
      try {
        const { data } = await NetClient.post<{ accessToken: string; email: string }>(
          '/api/auth/login',
          {
            email,
            password,
          },
        );

        this.token = data.accessToken;
        this.email = data.email;
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('email', data.email);
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Invalid email or password');
      }
    },
    logout() {
      this.token = null;
      this.email = null;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },

    checkToken() {},
  },
});
