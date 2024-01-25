<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner';
import TheHeader from './components/common/the-header.vue';
import ModalProvider from './components/modal-provider.vue';
</script>

<template>
  <modal-provider />
  <toaster />
  <the-header />

  <router-view />
</template>
