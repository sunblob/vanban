<template>
  <div
    class="flex flex-col gap-y-2 shrink-0 p-4 py-3 bg-gray-800 rounded-md w-[326px] cursor-pointer"
  >
    <div class="flex justify-between items-center gap-x-2 mb-2">
      <h2
        v-if="!isEditing"
        class="text-gray-300 font-medium text-lg flex-grow pl-2"
        @click="editTitle"
      >
        {{ column.title }}
      </h2>
      <input
        v-else
        ref="titleInput"
        type="text"
        class="text-gray-300 font-medium text-lg rounded bg-gray-700 px-2 focus-visible:outline-none focus-visible:ring w-full"
        :value="column.title"
        @keyup.enter="updateTitle"
        @blur="updateTitle"
      />
      <span>
        <more-horizontal-icon class="text-gray-300 hover:bg-neutral-600/50 rounded" />
      </span>
    </div>
    <draggable
      :list="column.tasks"
      group="tasks"
      tag="ul"
      item-key="id"
      class="flex flex-col gap-y-2"
      :animation="250"
      @change="test"
    >
      <template #item="{ element: task }: { element: Task }">
        <li>
          <vanban-board-card :task="task" @update-title="updateTaskTitle" />
        </li>
      </template>
    </draggable>
    <div
      v-if="!isAddingTask"
      role="button"
      class="text-gray-300 hover:bg-neutral-600/30 rounded-md p-2"
      @click="addTask"
    >
      + Add task
    </div>
    <div v-else class="flex flex-col gap-y-2">
      <input
        ref="newTask"
        type="text"
        v-model="taskTitle"
        @focusout="cancelFocus"
        class="text-gray-300 bg-gray-700 px-2 focus-visible:outline-none focus-visible:ring w-full rounded p-2"
      />
      <div class="flex items-center gap-x-2">
        <check-icon @click="confirm" class="text-gray-300 hover:bg-neutral-600/50 rounded" />
        <x-icon @click="cancel" class="text-gray-300 hover:bg-neutral-600/50 rounded" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { mapActions } from 'pinia';
import { MoreHorizontalIcon, XIcon, CheckIcon } from 'lucide-vue-next';
import Draggable from 'vuedraggable';

import { useBoardStore } from '@/stores/board';

import VanbanBoardCard from './vanban-board-card.vue';

import type { Column, Task } from '@/types';

export default defineComponent({
  name: 'vanban-board-column',

  components: {
    MoreHorizontalIcon,
    XIcon,
    CheckIcon,
    VanbanBoardCard,
    Draggable,
  },

  props: {
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
  },

  data() {
    return {
      isEditing: false,
      isAddingTask: false,
      taskTitle: '',
    };
  },

  emits: ['update-title', 'create-task', 'update-task'],

  methods: {
    addTask() {
      this.isAddingTask = true;

      // next tick because otherwise ref is undefined
      this.$nextTick(() => {
        (this.$refs['newTask'] as HTMLInputElement).focus();
      });
    },

    editTitle() {
      this.isEditing = true;

      // next tick because otherwise ref is undefined
      this.$nextTick(() => {
        (this.$refs['titleInput'] as HTMLInputElement).focus();
        (this.$refs['titleInput'] as HTMLInputElement).select();
      });
    },

    updateTitle(event: Event) {
      const newTitle = (event.target as HTMLInputElement).value;

      // if new title is empty or the same it was before we dont want to trigger emit
      if (newTitle === '' || newTitle === this.column.title) {
        this.isEditing = false;
        return;
      }

      this.updateColumn({ id: this.column.id, title: newTitle });
      // this.$emit('update-title', { columnId: this.column.id, title: newTitle });

      this.isEditing = false;
    },

    updateTaskTitle({ taskId, title }: { taskId: string; title: string }) {
      this.updateTask({ columnId: this.column.id, taskTitle: title, taskId });
    },

    confirm() {
      if (this.taskTitle) {
        this.createTask({ columnId: this.column.id, title: this.taskTitle });

        // this.$emit('create-task', {
        //   columnId: this.column.id,
        //   title: this.taskTitle,
        // });

        this.isAddingTask = false;
        this.taskTitle = '';
      }
    },

    cancelFocus() {
      if (!this.taskTitle) {
        this.isAddingTask = false;
      }
    },

    cancel() {
      this.isAddingTask = false;
      this.taskTitle = '';
    },

    test() {
      console.log(this.column.tasks);
    },

    ...mapActions(useBoardStore, ['updateColumn', 'createTask', 'updateTask']),
  },
});
</script>

<style scoped></style>
