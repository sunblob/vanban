<template>
  <vanban-board v-if="currentBoard" :board="currentBoard" />
</template>

<script setup lang="ts">
import { toRef } from 'vue';

import { useBoard } from '@/features/board/item-state';

import VanbanBoard from '@/components/vanban/vanban-board.vue';

const props = defineProps<{ id: string }>();

const { data: currentBoard } = useBoard(toRef(props.id));
</script>
