<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import TheHeader from './components/common/the-header.vue';
import ModalProvider from './components/modal-provider.vue';
</script>

<template>
  <vue-query-devtools />
  <modal-provider />
  <toaster />
  <the-header />

  <router-view />
</template>
