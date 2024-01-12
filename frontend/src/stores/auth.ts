import axios, { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';

interface State {
  token: string | null;
}

export const useAuth = defineStore('auth', {
  state: (): State => ({
    token: localStorage.getItem('token'),
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async register(email: string, password: string) {
      try {
        const { data } = await axios.post<{ accessToken: string }>(
          'http://localhost:3000/api/auth/register',
          {
            email,
            password,
          },
        );

        this.token = data.accessToken;
        localStorage.setItem('token', data.accessToken);
      } catch (error) {
        let errorMessage = '';

        if (error instanceof AxiosError) {
          console.log('Error: ', error.response?.data);
          errorMessage = error.response?.data;
        }

        console.log('Error: ', error);
        toast.error('User with this email already exists');
      }
    },
    async login(email: string, password: string) {
      try {
        const { data } = await axios.post('http://localhost:3000/api/auth/login', {
          email,
          password,
        });

        this.token = data.accessToken;
        localStorage.setItem('token', data.accessToken);
      } catch (error) {
        console.log('Error: ', error);
        toast.error('Invalid email or password');
      }
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});
