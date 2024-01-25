import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { toast } from 'vue-sonner';
import { EMAIL_KEY, TOKEN_KEY } from '@/utils/constants';
import { AuthApi } from '@/utils/api/auth';

interface AuthStore {
  token: string | null;
  email: string | null;
}

export const useAuth = defineStore('auth', () => {
  const router = useRouter();

  const token = useStorage(TOKEN_KEY, '', localStorage);
  const email = useStorage(EMAIL_KEY, '', localStorage);

  const isLoggedIn = computed(() => !!token.value);

  async function register(emailParam: string, password: string) {
    try {
      const { data } = await AuthApi.register(emailParam, password);
      token.value = data.accessToken;
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
      token.value = data.accessToken;
      email.value = data.email;
      toast.success('Successfully logged in');
    } catch (error) {
      console.log('Error: ', error);
      toast.error('Invalid email or password');
    }
  }

  async function logout() {
    token.value = null;
    email.value = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);

    await router.replace({ name: 'home' });
  }

  return { token, email, isLoggedIn, register, login, logout };
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
