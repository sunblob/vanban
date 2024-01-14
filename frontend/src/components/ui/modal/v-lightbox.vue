<template>
  <transition name="slide">
    <div v-if="isOpen" class="fixed top-0 bottom-0 flex justify-end w-[400px] bg-white">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
