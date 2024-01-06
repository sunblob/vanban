<template>
  <teleport :to="to">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center"
        :class="{
          'backdrop-blur-sm': blur,
          'bg-gray-900/50': dark,
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
  name: 'v-modal',

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
    closeEsc: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['update:modelValue'],

  methods: {
    closeModal() {
      this.$emit('update:modelValue', false);
    },

    handleEsc(event: KeyboardEvent) {
      if (!this.modelValue) {
        return;
      }

      if (event.key === 'Escape') {
        this.$emit('update:modelValue', false);
      }
    },
  },

  mounted() {
    if (this.closeEsc) {
      document.addEventListener('keyup', this.handleEsc);
    }
  },

  beforeUnmount() {
    if (this.closeEsc) {
      document.removeEventListener('keyup', this.handleEsc);
    }
  },

  watch: {
    modelValue(value: boolean) {
      if (value) {
        document.body.classList.add('overflow');
      } else {
        document.body.classList.remove('overflow');
      }
    },
  },
});
</script>

<style scoped></style>
