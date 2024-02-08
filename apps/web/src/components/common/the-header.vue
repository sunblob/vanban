<template>
  <header class="w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
    <div class="flex items-center w-full justify-between">
      <div class="flex items-center gap-x-4">
        <router-link v-if="!auth.isLoggedIn" to="/">
          <span class="text-lg text-neutral-700">Vanban</span>
        </router-link>
        <router-link v-else to="/boards">
          <span class="text-lg text-neutral-700">Vanban</span>
        </router-link>
        <router-link v-if="auth.isLoggedIn" :to="{ name: 'board-create' }">
          <v-button size="sm"> Create </v-button>
        </router-link>
      </div>
      <div class="space-x-4 flex items-center justify-between">
        <v-button v-if="!auth.isLoggedIn" size="sm" variant="ghost">
          <router-link to="/sign-in"> Login </router-link>
        </v-button>
        <div
          v-if="auth.isLoggedIn"
          class="relative flex items-center gap-x-2 font-medium cursor-pointer"
          @click="isDropdownOpen = true"
        >
          <span>{{ auth.email }}</span>
          <div class="h-8 w-8 rounded" :style="{ backgroundColor: `#${getRandomColor}` }"></div>
          <v-popover
            title="User actions"
            :is-open="isDropdownOpen"
            @close="closeDropdown"
            class="top-4 right-0"
          >
            <v-button size="sm" variant="danger" @click="handleLogout"> Logout </v-button>
          </v-popover>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { useAuth } from '@/stores/auth';

import VPopover from '../ui/popover/v-popover.vue';
import VButton from '../ui/v-button.vue';

const auth = useAuth();
const router = useRouter();

const isDropdownOpen = ref(false);

function handleLogout() {
  isDropdownOpen.value = false;
  auth.logout();

  router.push({ name: 'home' });
}

function closeDropdown() {
  isDropdownOpen.value = false;
}

const getRandomColor = computed(() => {
  return Math.floor(Math.random() * 16777215).toString(16);
});
</script>
