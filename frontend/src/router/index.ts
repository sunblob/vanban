import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/home-page.vue';
import { useAuth } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/views/sign-in-page.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/sign-up-page.vue'),
    },
    {
      path: '/boards',
      name: 'boards',
      component: () => import('@/views/boards-page.vue'),
    },
    {
      path: '/boards/:id',
      name: 'list',
      component: () => import('@/views/list-page.vue'),
    },
  ],
});

router.beforeEach((to, from) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn && to.name != 'sign-in' && to.name != 'home' && to.name != 'sign-up') {
    return { name: 'sign-in' };
  }
});

export default router;
