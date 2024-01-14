<template>
  <div v-if="isOpen" class="absolute">
    <div
      class="relative z-50 w-72 rounded-md border bg-white p-4 text-foreground shadow-md outline-none"
    >
      <div class="flex items-center justify-between mb-2 text-lg text-gray-500">
        <span>{{ title }}</span>
        <x-icon
          :size="18"
          @click.stop="close"
          class="hover:bg-gray-800/20 rounded cursor-pointer"
        />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { XIcon } from 'lucide-vue-next';

export default defineComponent({
  components: {
    XIcon,
  },

  emits: ['close'],

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>
