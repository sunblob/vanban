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
        {{ list.title }}
      </h2>
      <input
        v-else
        ref="titleInput"
        type="text"
        class="text-gray-300 font-medium text-lg rounded bg-gray-700 px-2 focus-visible:outline-none focus-visible:ring w-full"
        :value="list.title"
        @keyup.enter="updateTitle"
        @blur="updateTitle"
      />
      <div class="relative">
        <more-horizontal-icon
          class="text-gray-300 hover:bg-neutral-600/50 rounded"
          @click="isDropdownOpen = true"
        />
        <v-popover
          title="List actions"
          :is-open="isDropdownOpen"
          @close="isDropdownOpen = false"
          class="right-[-50%] translate-x-[50%]"
        >
          <div class="flex flex-col gap-y-2">
            <v-button variant="ghost" @click="copy">Copy list</v-button>
            <v-button
              variant="ghost"
              class="bg-red-500 hover:bg-red-800 text-white"
              @click="handleDelete"
              >Delete list</v-button
            >
          </div>
        </v-popover>
      </div>
    </div>
    <draggable
      :list="list.cards"
      group="cards"
      tag="ul"
      item-key="id"
      class="flex flex-col gap-y-2"
      :animation="250"
      :data-id="list.id"
      @end="move"
    >
      <template #item="{ element: card }: { element: Card }">
        <li :data-id="card.id">
          <vanban-board-card :card="card" @update-card-title="updateCardTitle" />
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
import { MoreHorizontalIcon, XIcon, CheckIcon } from 'lucide-vue-next';
import Draggable from 'vuedraggable';

import { mapActions } from 'pinia';

import { useBoardStore } from '@/stores/board';

import VanbanBoardCard from './vanban-board-card.vue';
import VPopover from './ui/popover/v-popover.vue';
import VButton from './ui/v-button.vue';

import type { List, Card } from '@/types';

export default defineComponent({
  name: 'vanban-board-list',

  components: {
    MoreHorizontalIcon,
    XIcon,
    CheckIcon,
    VanbanBoardCard,
    Draggable,
    VPopover,
    VButton,
  },

  emits: ['update-list-title', 'create-task', 'update-task-title'],

  props: {
    list: {
      type: Object as PropType<List>,
      required: true,
    },
  },

  data() {
    return {
      isEditing: false,
      isAddingTask: false,
      taskTitle: '',
      isDropdownOpen: false,
    };
  },

  methods: {
    ...mapActions(useBoardStore, [
      'createCard',
      'updateCardPosition',
      'deleteList',
      'copyList',
      'updateList',
    ]),

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
      if (newTitle === '' || newTitle === this.list.title) {
        this.isEditing = false;
        return;
      }

      this.updateList(this.list.id, newTitle);

      this.$emit('update-list-title', { listId: this.list.id, title: newTitle });

      this.isEditing = false;
    },

    updateCardTitle({ taskId, title }: { taskId: string; title: string }) {
      this.$emit('update-task-title', { taskId, title });
    },

    confirm() {
      if (this.taskTitle) {
        this.$emit('create-task', {
          listId: this.list.id,
          title: this.taskTitle,
        });

        this.createCard({
          listId: this.list.id,
          title: this.taskTitle,
          position: this.list.cards.length,
        });

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

    move(event: any) {
      const fromListId = event.from.dataset.id;
      const toListId = event.to.dataset.id;
      const newPosition = event.newIndex;
      const cardId = event.item.dataset.id;

      if (fromListId === toListId && newPosition === event.oldIndex) {
        return;
      }

      if (fromListId === toListId) {
        this.updateCardPosition({
          listId: fromListId,
          cardId,
          newPosition,
        });
      } else {
        this.updateCardPosition({
          listId: fromListId,
          cardId,
          newPosition,
          newListId: toListId,
        });
      }
    },

    copy() {
      this.isDropdownOpen = false;

      this.copyList(this.list.id);
    },

    handleDelete() {
      this.deleteList(this.list.id);
    },
  },
});
</script>

<style scoped></style>
