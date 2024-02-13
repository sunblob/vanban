<template>
  <div
    class="flex flex-col gap-y-1 px-2 py-2 rounded-md bg-gray-400 cursor-pointer hover:bg-gray-400/90 group"
    @click="modalStore.open(card.id)"
  >
    <div v-if="card.tags && card.tags.length" class="inline-flex gap-x-1">
      <span
        v-for="tag in card.tags"
        :key="tag"
        class="w-8 h-2 rounded-lg"
        :class="{
          'bg-red-500': tag === 'BUG',
          'bg-blue-500': tag === 'TASK',
          'bg-green-500': tag === 'OTHER',
        }"
      ></span>
    </div>
    <div class="flex items-center justify-between gap-x-2">
      <h3 v-show="!isEditing">{{ card.title }}</h3>
      <div v-show="isEditing" class="w-full">
        <textarea
          ref="titleInput"
          class="w-full resize-none focus-visible:outline-none focus-visible:ring rounded bg-gray-500/50"
          v-model="title"
          @click.stop
          @keyup.enter="isEditing = false"
        />
        <div class="flex items-center gap-x-2">
          <v-button size="sm" class="min-w-[100px]" @click.stop="updateTitle">Edit</v-button>
          <x-icon class="w-6 h-6 p-0.5 rounded hover:bg-gray-500" @click.stop="closeEdit" />
        </div>
      </div>
      <pencil-line-icon
        v-if="!isEditing"
        class="w-6 h-6 p-1 rounded hover:bg-gray-500 opacity-0 group-hover:opacity-100"
        @click.stop="editTitle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PencilLineIcon, XIcon } from 'lucide-vue-next';
import { onClickOutside } from '@vueuse/core';
import { useFocus } from '@vueuse/core';

import { useCardModal } from '@/stores/card-modal';
import { useCardActions } from '@/features/card/actions-state';

import VButton from './ui/v-button.vue';

import type { Card } from '@/types';

const props = defineProps<{
  card: Card;
}>();

const { updateCard } = useCardActions();
const modalStore = useCardModal();

const titleInput = ref<HTMLInputElement | null>(null);
const isEditing = ref(false);
const title = ref('');

const { focused } = useFocus(titleInput);

onClickOutside(titleInput, () => {
  isEditing.value = false;
});

function editTitle() {
  isEditing.value = true;

  title.value = props.card.title;

  focused.value = true;

  console.log('focused: ', focused.value, titleInput);

  // this.$nextTick(() => {
  //   (this.$refs['titleInput'] as HTMLInputElement).focus();
  //   (this.$refs['titleInput'] as HTMLInputElement).select();
  // });
}

function closeEdit() {
  isEditing.value = false;
}

function updateTitle() {
  isEditing.value = false;

  if (title.value === props.card.title) {
    return;
  }

  updateCard({
    id: props.card.id,
    title: title.value,
  });
}
</script>
