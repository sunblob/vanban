<template>
  <card-modal :is-open="store.isCardOpen" />
</template>

<script setup lang="ts">
import { useCardModal } from '@/stores/card-modal';
import CardModal from './card-modal.vue';

const store = useCardModal();
</script>

<style scoped></style>
