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
      path: '/boards/create',
      name: 'board-create',
      component: () => import('@/views/board-create-page.vue'),
    },
    {
      path: '/boards/:id',
      name: 'board-details',
      component: () => import('@/views/board-details-page.vue'),
      props: true,
    },
  ],
});

router.beforeEach((to) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn && to.name != 'sign-in' && to.name != 'home' && to.name != 'sign-up') {
    return { name: 'sign-in' };
  }
});

export default router;
