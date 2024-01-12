<template>
  <div
    class="flex flex-col gap-y-1 px-2 py-2 rounded-md bg-gray-400 cursor-pointer hover:bg-gray-400/90 group"
    @click="isModalOpen = true"
  >
    <div v-if="task.tags && task.tags.length" class="inline-flex gap-x-1">
      <span
        v-for="tag in task.tags"
        :key="tag"
        class="w-8 h-2 rounded-lg"
        :class="{
          'bg-red-500': tag === 'bug',
          'bg-blue-500': tag === 'task',
          'bg-green-500': tag === 'story',
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
    <div v-if="task.endsAt" class="flex gap-x-2">
      <div v-if="task.endsAt" class="flex gap-x-2">
        <clock-icon :size="16" />
      </div>
    </div>
    <v-modal v-model="isModalOpen" blur dark>
      <div class="w-[400px] bg-gray-700 rounded py-4 px-4">
        <div class="text-gray-300">{{ task.title }}</div>
      </div>
    </v-modal>
  </div>

  <div
    v-if="isModalOpen"
    class="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center cursor-default"
    @click.self="isModalOpen = false"
  >
    <div class="w-[400px] bg-gray-700 rounded py-4 px-4">
      <div class="text-gray-300">{{ task.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { mapActions } from 'pinia';
import { Clock3Icon as ClockIcon, PencilLineIcon, XIcon } from 'lucide-vue-next';

import { useBoardStore } from '@/stores/board';

import VModal from '@/components/ui/modal/v-modal.vue';
import VButton from './ui/v-button.vue';

import type { Card } from '@/types';

export default defineComponent({
  name: 'vanban-board-task',

  components: { VModal, ClockIcon, PencilLineIcon, XIcon, VButton },

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

  emits: ['update-title'],

  methods: {
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

      console.log('updateTitle:task.vue');

      this.$emit('update-title', {
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
