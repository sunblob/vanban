<template>
  <card-modal :is-open="isCardOpen" />
  <board-lightbox :is-open="isBoxOpen" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useBoardBox } from '@/stores/board-box';
import { useCardModal } from '@/stores/card-modal';
import CardModal from './card-modal.vue';
import BoardLightbox from './board-lightbox.vue';

export default defineComponent({
  components: {
    CardModal,
    BoardLightbox,
  },

  computed: {
    ...mapState(useBoardBox, ['isBoxOpen']),
    ...mapState(useCardModal, ['isCardOpen']),
  },
});
</script>

<style scoped></style>
