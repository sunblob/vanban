<template>
  <div class="relative h-full bg-rose-400 flex flex-col">
    <vanban-board-header :title="board.title" @delete-board="deleteBoard" />
    <div class="h-full overflow-auto flex gap-x-4 items-start p-4">
      <draggable
        :list="board.lists"
        group="lists"
        class="flex gap-x-4 items-start"
        :animation="250"
        item-key="id"
        tag="ul"
        @end="moveList"
      >
        <template #item="{ element: list }: { element: List }">
          <li :data-id="list.id">
            <vanban-board-list
              :list="list"
              @create-task="createTask"
              @update-list-title="updateListTitle"
              @update-task-title="updateTaskTitle"
            />
          </li>
        </template>
      </draggable>
      <div
        v-if="!isAddingColumn"
        role="button"
        class="w-[326px] shrink-0 text-blue-950 bg-blue-300 text-lg rounded-md p-2"
        @click="isAddingColumn = true"
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
          <v-button variant="primary" @click="addColumn">Add column</v-button>
          <div
            class="flex items-center justify-center p-2 cursor-pointer hover:bg-gray-700 rounded"
          >
            <x-icon :size="24" class="text-neutral-300" @click="isAddingColumn = false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Draggable from 'vuedraggable';
import { XIcon } from 'lucide-vue-next';
import { mapActions } from 'pinia';

import { useBoardStore } from '@/stores/board';

import VanbanBoardList from './vanban-board-list.vue';
import VanbanBoardHeader from './vanban-board-header.vue';
import VButton from './ui/v-button.vue';

import type { List, Card, Board } from '@/types';

export default defineComponent({
  name: 'vanban-board',

  components: {
    Draggable,
    VanbanBoardList,
    VButton,
    VanbanBoardHeader,
    XIcon,
  },

  emits: ['delete-board', 'update-board', 'create-task', 'update-list-title', 'update-task-title'],

  props: {
    board: {
      type: Object as PropType<Board>,
      required: true,
    },
  },

  data: () => ({
    activeDragTask: '' as string,
    isAddingColumn: false,
    newColumn: '',
  }),

  methods: {
    ...mapActions(useBoardStore, ['createList', 'updateListPosition']),

    onDragTask(task: Card) {
      this.activeDragTask = task.id;
    },
    onDragEnd() {
      this.activeDragTask = '';
    },

    addColumn() {
      this.createList({
        title: this.newColumn,
        boardId: this.board.id,
        position: this.board.lists.length,
      });

      this.newColumn = '';
      this.isAddingColumn = true;
    },

    // board
    deleteBoard() {
      this.$emit('delete-board', this.board.id);
    },

    updateBoard() {
      this.$emit('update-board', this.board);
    },

    // list
    createTask() {
      this.$emit('create-task', this.board.id);
    },

    updateListTitle() {},

    updateTaskTitle() {},

    moveList(event: any) {
      const newIndex = event.newIndex;

      this.updateListPosition({
        boardId: this.board.id,
        listId: event.item.dataset.id,
        newPosition: newIndex,
      });
    },
  },
});
</script>

<style scoped></style>
