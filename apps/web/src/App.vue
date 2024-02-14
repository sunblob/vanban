<script setup lang="ts">
// import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import TheHeader from './components/common/the-header.vue';
import ModalProvider from './components/modal-provider.vue';

import { useAuth } from '@/stores/auth';

const store = useAuth();

store.checkToken();
</script>

<template>
  <vue-query-devtools />
  <modal-provider />
  <toaster />
  <the-header />

  <router-view />
</template>
