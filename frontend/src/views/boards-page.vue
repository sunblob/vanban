<template>
  <div class="h-full">
    <vanban-board />
  </div>
</template>

<script lang="ts">
import VanbanBoard from '@/components/vanban-board.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    VanbanBoard,
  },
});
</script>

<style scoped></style>
