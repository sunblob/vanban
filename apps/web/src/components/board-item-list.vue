<template>
  <div class="grid grid-cols-3 gap-4">
    <board-item v-for="board in boards" :key="board.id" :board="board" />

    <router-link :to="{ name: 'board-create' }">
      <div
        class="h-[226px] bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-2xl gap-2 cursor-pointer"
      >
        New board <plus-circle-icon class="w-6 h-6" />
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { PlusCircleIcon } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import type { Board } from '@/types';
import BoardItem from './board-item.vue';

export default defineComponent({
  components: {
    BoardItem,
    PlusCircleIcon,
    RouterLink,
  },

  props: {
    boards: {
      type: Array as PropType<Board[]>,
      default: () => [],
    },
  },
});
</script>

<style scoped></style>
