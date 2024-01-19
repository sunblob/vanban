<template>
  <vanban-board v-if="currentBoard" :board="currentBoard" @delete-board="handleDeleteBoard" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import VanbanBoard from '@/components/vanban-board.vue';
import { useBoardStore } from '@/stores/board';

export default defineComponent({
  components: {
    VanbanBoard,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState(useBoardStore, ['currentBoard']),
  },

  methods: {
    ...mapActions(useBoardStore, ['getBoard', 'deleteBoard']),

    handleDeleteBoard(id: string) {
      this.$router.push({ name: 'boards' });
      this.deleteBoard(id);
    },
  },

  watch: {
    id() {
      this.getBoard(this.id);
    },
  },

  mounted() {
    this.getBoard(this.id);
  },
});
</script>
