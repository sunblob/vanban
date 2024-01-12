<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import VButton from '@/components/ui/v-button.vue';

export default defineComponent({
  components: {
    VButton,
    RouterLink,
  },
});
</script>

<template>
  <main class="h-full flex flex-col justify-center items-center">
    <h1 class="text-3xl md:text-6xl text-center text-neutral-800 mb-6 max-w-2xl">
      <span class="text-emerald-500">Vanban</span> helps team move work forward
    </h1>

    <div class="text-sm md:text-xl text-neutral-400 max-w-xs md:max-w-2xl text-center mx-auto">
      Collaborate, manage projects, and reach new productivity peaks. From high rises to the home
      office, the way your team works is unique - accomplish it all with Vanban.
    </div>
    <v-button class="mt-6" size="lg" variant="primary">
      <router-link to="/sign-in">Get Started</router-link>
    </v-button>
  </main>
</template>
