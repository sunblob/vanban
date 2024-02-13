<template>
  <div
    class="relative h-full bg-rose-400 flex flex-col bg-cover"
    :style="{ backgroundImage: `url(${board.fullImage})` }"
  >
    <vanban-board-header
      :title="board.title"
      @delete-board="handleDeleteBoard"
      @update-title="updateBoardTitle"
    />
    <div class="h-full overflow-auto flex gap-x-4 items-start p-4">
      <draggable
        v-model="boardLists"
        :animation="250"
        group="lists"
        item-key="id"
        tag="ul"
        class="flex gap-x-4 items-start"
        @end="moveList"
      >
        <template #item="{ element: list }: { element: List }">
          <li :data-id="list.id">
            <vanban-board-list :list="list" />
          </li>
        </template>
      </draggable>
      <div
        v-if="!isAddingList"
        role="button"
        class="w-[326px] shrink-0 text-blue-950 bg-blue-300 text-lg rounded-md p-2"
        @click="isAddingList = true"
      >
        + Add list
      </div>
      <div v-else class="flex flex-col gap-y-4 w-[326px] shrink-0 bg-gray-800 rounded-md p-2">
        <input
          type="text"
          v-model="newList"
          placeholder="Write a list title"
          class="w-full bg-gray-700 text-neutral-200 text-lg focus-visible:outline-none focus-visible:ring rounded px-2 py-1"
        />
        <div class="flex gap-x-2 items-center">
          <v-button variant="primary" @click="addList">Add list</v-button>
          <div
            class="flex items-center justify-center p-2 cursor-pointer hover:bg-gray-700 rounded"
          >
            <x-icon :size="24" class="text-neutral-300" @click="isAddingList = false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Draggable from 'vuedraggable';
import { XIcon } from 'lucide-vue-next';

import { useBoardActions } from '@/features/board/actions-state';
import { useListActions } from '@/features/list/actions-state';

import VanbanBoardList from './vanban-board-list.vue';
import VanbanBoardHeader from './vanban-board-header.vue';
import VButton from '../ui/v-button.vue';

import type { List, Board } from '@/types';

const props = defineProps<{
  board: Board;
}>();

const { deleteBoard, updateBoard } = useBoardActions();
const { createList, reorderList } = useListActions();

const isAddingList = ref(false);
const newList = ref('');

const boardLists = ref(props.board.lists);

function addList() {
  if (!newList.value) {
    return;
  }

  createList({
    title: newList.value,
    position: props.board.lists.length,
    boardId: props.board.id,
  });

  console.log('addList: ', newList.value, props.board.lists.length, props.board.id);

  newList.value = '';
  isAddingList.value = true;
}

function moveList(event: any) {
  const newIndex = event.newIndex;

  if (newIndex === event.oldIndex) {
    return;
  }

  reorderList({
    boardId: props.board.id,
    id: event.item.dataset.id,
    newPosition: newIndex,
  });
}

function handleDeleteBoard() {
  deleteBoard(props.board.id);
}

function updateBoardTitle(newTitle: string) {
  updateBoard({
    id: props.board.id,
    title: newTitle,
  });
}
</script>

<style scoped></style>
