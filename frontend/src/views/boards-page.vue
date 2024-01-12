<template>
  <div class="h-full">
    <div v-for="board in boards" :key="board.id">
      {{ board.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useBoardStore } from '@/stores/board';

export default defineComponent({
  components: {},

  computed: {
    ...mapState(useBoardStore, ['boards']),
  },

  methods: {
    ...mapActions(useBoardStore, ['getBoards']),
  },

  mounted() {
    this.getBoards();
  },
});
</script>

<style scoped></style>
