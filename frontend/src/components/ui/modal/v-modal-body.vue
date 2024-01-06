<template>
  <teleport :to="to">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="fixed top-0 left-0 w-full h-full"
        :class="{
          'backdrop-blur-sm': blur,
          'bg-gray-900/10': dark,
        }"
        @click.self="closeModal"
      >
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'v-modal-body',

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    blur: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: true,
    },
    to: {
      type: String,
      default: 'body',
    },
  },

  emits: ['close-modal'],

  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
});
</script>

<style scoped></style>
