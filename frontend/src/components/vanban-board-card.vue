<template>
  <div
    class="flex flex-col gap-y-1 px-2 py-2 rounded-md bg-gray-400 cursor-pointer hover:bg-gray-400/90 group"
    @click="open(task.id)"
  >
    <div v-if="task.tags && task.tags.length" class="inline-flex gap-x-1">
      <span
        v-for="tag in task.tags"
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
      <h3 v-if="!isEditing">{{ task.title }}</h3>
      <div v-else class="w-full">
        <textarea
          ref="titleInput"
          class="w-full resize-none focus-visible:outline-none focus-visible:ring rounded bg-gray-500/50"
          v-model="title"
          @click.stop
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

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { mapActions } from 'pinia';
import { Clock3Icon as ClockIcon, PencilLineIcon, XIcon } from 'lucide-vue-next';

import { useCardModal } from '@/stores/card-modal';
import { useBoardStore } from '@/stores/board';

import VButton from './ui/v-button.vue';

import type { Card } from '@/types';

export default defineComponent({
  name: 'vanban-board-task',

  components: { PencilLineIcon, XIcon, VButton },

  props: {
    task: {
      type: Object as PropType<Card>,
      required: true,
    },
  },

  data() {
    return {
      isModalOpen: false,
      isEditing: false,
      title: '',
    };
  },

  emits: ['update-task-title'],

  methods: {
    ...mapActions(useCardModal, ['open']),
    ...mapActions(useBoardStore, ['updateCard']),

    editTitle() {
      this.isEditing = true;

      this.$nextTick(() => {
        (this.$refs['titleInput'] as HTMLInputElement).focus();
        (this.$refs['titleInput'] as HTMLInputElement).select();
      });
    },

    closeEdit() {
      this.isEditing = false;
    },

    updateTitle() {
      this.isEditing = false;

      if (this.title === this.task.title) {
        return;
      }

      this.updateCard({
        id: this.task.id,
        title: this.title,
      });

      this.$emit('update-task-title', {
        taskId: this.task.id,
        title: this.title,
      });
    },
  },

  mounted() {
    this.title = this.task.title;
  },
});
</script>

<style scoped></style>
