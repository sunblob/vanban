<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner';
import TheHeader from './components/common/the-header.vue';
import ModalProvider from './components/modal-provider.vue';

export default defineComponent({
  components: {
    RouterView,
    Toaster,
    ModalProvider,
    TheHeader,
  },
});
</script>

<template>
  <modal-provider />
  <toaster />
  <the-header />

  <router-view />
</template>
