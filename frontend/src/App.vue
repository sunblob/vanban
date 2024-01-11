<script setup lang="ts">
import { RouterView } from 'vue-router';
import VanbanSidebar from './components/vanban-sidebar.vue';
import TheHeader from './components/common/the-header.vue';
</script>

<template>
  <the-header />

  <router-view />
</template>
