<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner';
import TheHeader from './components/common/the-header.vue';
</script>

<template>
  <toaster />
  <the-header />

  <router-view />
</template>
