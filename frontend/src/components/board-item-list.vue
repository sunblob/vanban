<template>
  <div class="grid grid-cols-3 gap-4">
    <board-item v-for="board in boards" :key="board.id" :board="board" />

    <div class="h-[226px]"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Board } from '@/types';
import BoardItem from './board-item.vue';

export default defineComponent({
  components: {
    BoardItem,
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
