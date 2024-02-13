<template>
  <div
    class="h-[226px] flex flex-col justify-between rounded-md p-4 cursor-pointer bg-cover"
    :style="{
      backgroundImage: `url(${board.previewImage})`,
      backgroundColor: `#${randomColor}`,
    }"
    @click.self="openBoard"
  >
    <board-item-options :board="board" />
    <!-- <div class="flex justify-end relative">
      <more-horizontal-icon
        class="text-white hover:bg-gray-800/20 rounded"
        @click.stop.self="openDropdown"
      />
      <v-popover title="Board actions" :is-open="isDropdownOpen" @close="isDropdownOpen = false">
        <v-button size="sm" variant="danger" @click="handleDelete"> Delete </v-button>
      </v-popover>
    </div> -->
    <h2 class="text-3xl font-bold text-white">{{ board.title }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import type { Board } from '@/types';
import BoardItemOptions from './board-item-options.vue';

const { board } = defineProps<{
  board: Board;
}>();

const router = useRouter();

const randomColor = computed(() => {
  // generate random hex color
  return Math.floor(Math.random() * 16777215).toString(16);
});

function openBoard() {
  router.push({ name: 'board-details', params: { id: board.id } });
}

// function openDropdown() {
//   isDropdownOpen.value = true;
// }

// function handleDelete() {
//   deleteBoard(board.id);

//   isDropdownOpen.value = false;
// }
</script>

<style scoped></style>
