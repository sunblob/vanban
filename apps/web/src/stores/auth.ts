import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { toast } from 'vue-sonner';
import { EMAIL_KEY, REFRESH_TOKEN_KEY, TOKEN_KEY } from '@/utils/constants';
import { AuthApi } from '@/utils/api/auth';
import { AxiosError } from 'axios';

// interface AuthStore {
//   token: string | null;
//   email: string | null;
// }

export const useAuth = defineStore('auth', () => {
  const router = useRouter();

  const accessToken = useStorage(TOKEN_KEY, '', localStorage);
  const refreshToken = useStorage(REFRESH_TOKEN_KEY, '', localStorage);
  const email = useStorage(EMAIL_KEY, '', localStorage);

  const isLoggedIn = computed(() => !!accessToken.value);

  async function register(emailParam: string, passwordParam: string) {
    try {
      const { data } = await AuthApi.register(emailParam, passwordParam);
      accessToken.value = data.accessToken;
      refreshToken.value = data.refreshToken;
      email.value = data.email;
      toast.success('Successfully registered');
    } catch (error) {
      console.log('Error: ', error);
      toast.error('User with this email already exists');
    }
  }

  async function login(emailParam: string, password: string) {
    try {
      const { data } = await AuthApi.login(emailParam, password);
      accessToken.value = data.accessToken;
      refreshToken.value = data.refreshToken;
      email.value = data.email;

      toast.success('Successfully logged in');
    } catch (error) {
      console.log('Error: ', error);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || 'Invalid email or password');
      }
    }
  }

  async function logout() {
    accessToken.value = null;
    refreshToken.value = null;
    email.value = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    await router.replace({ name: 'home' });
  }

  async function checkToken() {
    try {
      await AuthApi.checkToken(accessToken.value);

      router.replace({ name: 'boards' });
    } catch (error) {
      accessToken.value = null;
      refreshToken.value = null;
      email.value = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EMAIL_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);

      router.replace({ name: 'sign-in' });
    }
  }

  return { accessToken, refreshToken, email, isLoggedIn, register, login, logout, checkToken };
});

// export const useAuth = defineStore('auth', {
//   state: (): AuthStore => ({
//     token: localStorage.getItem('token'),
//     email: localStorage.getItem('email'),
//   }),
//   getters: {
//     isLoggedIn: (state) => !!state.token,
//   },
//   actions: {
//     async register(email: string, password: string) {
//       try {
//         const { data } = await AuthApi.register(email, password);

//         this.token = data.accessToken;
//         this.email = data.email;
//         localStorage.setItem('token', data.accessToken);
//         localStorage.setItem('email', data.email);
//       } catch (error) {
//         console.log('Error: ', error);
//         toast.error('User with this email already exists');
//       }
//     },
//     async login(email: string, password: string) {
//       try {
//         const { data } = await AuthApi.login(email, password);

//         this.token = data.accessToken;
//         this.email = data.email;
//         localStorage.setItem('token', data.accessToken);
//         localStorage.setItem('email', data.email);
//       } catch (error) {
//         console.log('Error: ', error);
//         toast.error('Invalid email or password');
//       }
//     },
//     logout() {
//       this.token = null;
//       this.email = null;
//       localStorage.removeItem('token');
//       localStorage.removeItem('email');
//     },

//     checkToken() {},
//   },
// });
