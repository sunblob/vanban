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
            <v-button variant="danger" @click="handleDelete">Delete list</v-button>
          </div>
        </v-popover>
      </div>
    </div>
    <draggable
      v-model="listCards"
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
          <vanban-board-card :card="card" />
        </li>
      </template>
    </draggable>
    <div
      v-if="!isAddingCard"
      role="button"
      class="text-gray-300 hover:bg-neutral-600/30 rounded-md p-2"
      @click="addCard"
    >
      + Add card
    </div>
    <div v-else class="flex flex-col gap-y-2">
      <input
        ref="cardInput"
        type="text"
        v-model="cardTitle"
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

<script setup lang="ts">
import { ref } from 'vue';
import { useFocus } from '@vueuse/core';
import { MoreHorizontalIcon, XIcon, CheckIcon } from 'lucide-vue-next';
import Draggable from 'vuedraggable';

import VanbanBoardCard from './vanban-board-card.vue';
import VPopover from './ui/popover/v-popover.vue';
import VButton from './ui/v-button.vue';

import type { List, Card } from '@/types';
import { useListActions } from '@/features/list/actions-state';
import { useCardActions } from '@/features/card/actions-state';

const { list } = defineProps<{
  list: List;
}>();

const { updateList, copyList, deleteList } = useListActions();
const { createCard, reorderCard } = useCardActions();

const listCards = ref(list.cards);

const isEditing = ref(false);
const isAddingCard = ref(false);
const cardTitle = ref('');
const isDropdownOpen = ref(false);

const cardInput = ref(null);
const { focused } = useFocus(cardInput);

function addCard() {
  isAddingCard.value = true;

  focused.value = true;
}
function editTitle() {
  isEditing.value = true;

  focused.value = true;
}

function updateTitle(event: Event) {
  const newTitle = (event.target as HTMLInputElement).value;

  // if new title is empty or the same it was before we dont want to trigger emit
  if (newTitle === '' || newTitle === list.title) {
    isEditing.value = false;
    return;
  }

  updateList({ id: list.id, title: newTitle });

  isEditing.value = false;
}

function confirm() {
  if (cardTitle.value) {
    createCard({
      listId: list.id,
      title: cardTitle.value,
      position: list.cards.length,
    });

    isAddingCard.value = false;
    cardTitle.value = '';
  }
}

function cancelFocus() {
  if (!cardTitle.value) {
    isAddingCard.value = false;
  }
}

function cancel() {
  isAddingCard.value = false;
  cardTitle.value = '';
}

function move(event: any) {
  const fromListId = event.from.dataset.id;
  const toListId = event.to.dataset.id;
  const newPosition = event.newIndex;
  const cardId = event.item.dataset.id;

  if (fromListId === toListId && newPosition === event.oldIndex) {
    return;
  }

  if (fromListId === toListId) {
    reorderCard({
      listId: fromListId,
      cardId,
      newPosition,
    });
  } else {
    reorderCard({
      listId: fromListId,
      cardId,
      newPosition,
      newListId: toListId,
    });
  }
}

function copy() {
  isDropdownOpen.value = false;

  copyList(list.id);
}

function handleDelete() {
  deleteList(list.id);
}
</script>
