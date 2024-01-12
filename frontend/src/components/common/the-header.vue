<template>
  <header class="w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
    <div class="flex items-center w-full justify-between">
      <div class="flex items-center gap-x-4">
        <router-link to="/">
          <span class="text-lg text-neutral-700">Vanban</span>
        </router-link>
        <v-button v-if="isLoggedIn" size="sm"> Create </v-button>
      </div>
      <div class="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
        <v-button v-if="!isLoggedIn" size="sm" variant="ghost">
          <router-link to="/sign-in"> Login </router-link>
        </v-button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { mapState } from 'pinia';
import { useAuth } from '@/stores/auth';
import VButton from '../ui/v-button.vue';

export default defineComponent({
  components: {
    VButton,
    RouterLink,
  },

  computed: {
    ...mapState(useAuth, ['isLoggedIn']),
  },
});
</script>

<style scoped></style>
