<template>
  <div class="w-full flex items-center justify-between p-4 bg-gray-800/70">
    <div class="text-white text-2xl font-semibold">
      <span v-if="!isEditing" class="cursor-pointer" @click="editTitle">
        {{ title }}
      </span>
      <input
        v-else
        ref="titleInput"
        type="text"
        :value="title"
        class="bg-gray-800/60 text-white max-w-[200px]"
        @blur="isEditing = false"
        @keyup.enter="updateTitle"
      />
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

  emits: ['delete-board', 'update-title'],

  data() {
    return {
      isDropdownOpen: false,
      isEditing: false,
    };
  },

  methods: {
    deleteBoard() {
      this.isDropdownOpen = false;

      this.$emit('delete-board');
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

      if (!newTitle.length || newTitle === this.title) {
        this.isEditing = false;
        return;
      }

      this.isEditing = false;

      this.$emit('update-title', newTitle);
    },
  },
});
</script>
