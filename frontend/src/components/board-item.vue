<template>
  <div
    class="h-[226px] flex flex-col justify-between rounded-md p-4 cursor-pointer bg-cover"
    :style="{
      backgroundImage: `url(${board.previewImage})`,
      backgroundColor: `#${getRandomColor}`,
    }"
    @click.self="openBoard"
  >
    <div class="flex justify-end relative">
      <more-horizontal-icon
        class="text-white hover:bg-gray-800/20 rounded"
        @click.stop.self="openDropdown"
      />
      <v-popover title="Board actions" :is-open="isDropdownOpen" @close="isDropdownOpen = false">
        <v-button
          size="sm"
          variant="ghost"
          class="bg-red-500 hover:bg-red-800 text-white"
          @click="handleDelete"
        >
          Delete
        </v-button>
      </v-popover>
    </div>
    <h2 class="text-3xl font-bold text-white">{{ board.title }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { MoreHorizontalIcon } from 'lucide-vue-next';
import { mapActions } from 'pinia';

import { useBoardStore } from '@/stores/board';

import VButton from './ui/v-button.vue';
import VPopover from './ui/popover/v-popover.vue';

import type { Board } from '@/types';

export default defineComponent({
  components: {
    MoreHorizontalIcon,
    VButton,
    VPopover,
  },

  props: {
    board: {
      type: Object as PropType<Board>,
      required: true,
    },
  },

  data() {
    return {
      isDropdownOpen: false,
    };
  },

  computed: {
    getRandomColor() {
      // generate random hex color
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      return randomColor;
    },
  },

  methods: {
    ...mapActions(useBoardStore, ['deleteBoard']),

    openDropdown() {
      console.log('isDropdownOpen');

      this.isDropdownOpen = true;
    },

    handleDelete() {
      console.log('delete board');

      this.deleteBoard(this.board.id);

      this.isDropdownOpen = false;
    },

    openBoard() {
      this.$router.push({ name: 'board-details', params: { id: this.board.id } });
    },
  },
});
</script>

<style scoped></style>
