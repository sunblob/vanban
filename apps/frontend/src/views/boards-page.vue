<template>
  <div class="h-full p-4">
    <h1 class="text-4xl mb-4 font-semibold">Your boards</h1>
    <board-item-list :boards="boards" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useBoardStore } from '@/stores/board';
import BoardItemList from '@/components/board-item-list.vue';

export default defineComponent({
  components: {
    BoardItemList,
  },

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
