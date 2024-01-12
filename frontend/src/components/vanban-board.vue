<template>
  <vanban-board-header />
  <div class="h-full bg-rose-400 overflow-auto flex gap-x-4 items-start p-4">
    <draggable
      :list="columns"
      group="columns"
      class="flex gap-x-4 items-start"
      :animation="250"
      item-key="id"
    >
      <template #item="{ element: column }: { element: List }">
        <vanban-board-column :column="column"> </vanban-board-column>
      </template>
    </draggable>
    <div
      v-if="!isAddingColumn"
      role="button"
      @click="addColumn"
      class="w-[326px] shrink-0 text-blue-950 bg-blue-300 text-lg rounded-md p-2"
    >
      + Add column
    </div>
    <div v-else class="flex flex-col gap-y-4 w-[326px] shrink-0 bg-gray-800 rounded-md p-2">
      <input
        type="text"
        v-model="newColumn"
        placeholder="Write a column title"
        class="w-full bg-gray-700 text-neutral-200 text-lg focus-visible:outline-none focus-visible:ring rounded px-2 py-1"
      />
      <div class="flex gap-x-2 items-center">
        <v-button variant="primary">Add column</v-button>
        <div class="flex items-center justify-center p-2 cursor-pointer hover:bg-gray-700 rounded">
          <x-icon :size="24" class="text-neutral-300" @click="isAddingColumn = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import Draggable from 'vuedraggable';
import { XIcon } from 'lucide-vue-next';

import { useBoardStore } from '@/stores/board';

import VanbanBoardColumn from './vanban-board-column.vue';
import VanbanBoardHeader from './vanban-board-header.vue';
import VButton from './ui/v-button.vue';

import type { List, Card, ID } from '@/types';

export default defineComponent({
  name: 'vanban-board',

  components: {
    Draggable,
    VanbanBoardColumn,
    VButton,
    VanbanBoardHeader,
    XIcon,
  },

  data: () => ({
    activeDragTask: '' as ID,
    isAddingColumn: false,
    newColumn: '',
  }),

  computed: {
    ...mapState(useBoardStore, ['columns']),
  },

  methods: {
    onDragTask(task: Card) {
      this.activeDragTask = task.id;
    },
    onDragEnd() {
      this.activeDragTask = '';
    },

    addColumn() {
      this.newColumn = '';
      this.isAddingColumn = true;
    },

    // calling pinia store
    ...mapActions(useBoardStore, ['updateColumn', 'createTask']),
  },
});
</script>

<style scoped></style>
