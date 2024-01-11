<template>
  <header class="w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
    <div class="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
      Vanban
      <div class="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
        <v-button size="sm">
          <router-link to="/sign-in"> Login </router-link>
        </v-button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import VButton from '../ui/v-button.vue';

export default defineComponent({
  components: {
    VButton,
    RouterLink,
  },
});
</script>

<style scoped></style>
