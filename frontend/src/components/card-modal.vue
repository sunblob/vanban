<template>
  <v-modal :is-open="isOpen" @close="close">
    <div v-if="card" class="w-[500px] rounded p-4 bg-gray-800">
      {{ card.title }}
    </div>
  </v-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useCardModal } from '@/stores/card-modal';
import VModal from './ui/modal/v-modal.vue';

export default defineComponent({
  components: {
    VModal,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState(useCardModal, ['id', 'isCardOpen', 'card']),
  },

  methods: {
    ...mapActions(useCardModal, ['close', 'loadCardInfo']),
  },

  watch: {
    id() {
      this.loadCardInfo();
    },
  },
});
</script>

<style scoped></style>
