<template>
  <div class="w-full flex items-center justify-between p-4 bg-gray-800/70">
    <div class="text-white text-2xl font-semibold">
      {{ title }}
    </div>
    <div class="relative">
      <more-horizontal-icon
        class="text-white cursor-pointer"
        :size="24"
        @click="isDropdownOpen = true"
      />
      <v-popover
        title="Board actions"
        :is-open="isDropdownOpen"
        class="right-0"
        @close="isDropdownOpen = false"
      >
        <v-button variant="ghost" @click="deleteBoard"> Delete this board </v-button>
      </v-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MoreHorizontalIcon } from 'lucide-vue-next';
import VPopover from './ui/popover/v-popover.vue';
import VButton from './ui/v-button.vue';

export default defineComponent({
  name: 'vanban-board-header',

  components: {
    MoreHorizontalIcon,
    VPopover,
    VButton,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
  },

  emits: ['delete-board'],

  data() {
    return {
      isDropdownOpen: false,
    };
  },

  methods: {
    deleteBoard() {
      this.isDropdownOpen = false;

      this.$emit('delete-board');
    },
  },
});
</script>
