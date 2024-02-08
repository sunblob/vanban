<template>
  <div class="h-full p-4">
    <h1 class="text-4xl mb-4 font-semibold">Your boards</h1>
    <board-item-list :boards="boards" />
  </div>
</template>

<script setup lang="ts">
import { useBoards } from '@/features/board/list-state';

import BoardItemList from '@/components/board-item-list.vue';

const { data: boards } = useBoards();
</script>

<style scoped></style>
