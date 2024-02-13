<template>
  <popover>
    <popover-trigger as-child>
      <more-horizontal-icon class="text-white hover:bg-gray-800/20 rounded" />
    </popover-trigger>
    <popover-content side="right" :side-offset="10" align="start">
      <div class="flex justify-between items-center">
        <h3 class="mb-2 font-semibold">Board Options</h3>
        <popover-close>
          <x-icon />
        </popover-close>
      </div>
      <div class="flex flex-col gap-y-2">
        <v-button size="sm" variant="ghost" @click="handleUpdateBoard">Update</v-button>
        <v-button size="sm" variant="destructive" @click="handleDeleteBoard"> Delete </v-button>
      </div>
    </popover-content>
  </popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MoreHorizontalIcon, XIcon } from 'lucide-vue-next';
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from '../ui/popover';
import { VButton } from '../ui/button';

import { Board } from '@/types';

import { useBoardActions } from '@/features/board/actions-state';

const { deleteBoard } = useBoardActions();

const { board } = defineProps<{
  board: Board;
}>();

const isOpen = ref(false);

function handleDeleteBoard() {
  deleteBoard(board.id);
  isOpen.value = false;
}

function handleUpdateBoard() {
  console.log('update board');
}
</script>
