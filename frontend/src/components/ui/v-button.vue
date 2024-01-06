<template>
  <button
    class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    :class="{
      'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
      'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
      'h-10 px-4 py-2': size === 'default',
      'h-9 rounded-md px-3': size === 'sm',
      'h-11 rounded-md px-8': size === 'lg',
    }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

type Variants = 'primary' | 'secondary' | 'outline';
type Sizes = 'default' | 'sm' | 'lg';

export default defineComponent({
  name: 'v-button',

  props: {
    variant: {
      type: String as PropType<Variants>,
      default: 'primary',
    },

    size: {
      type: String as PropType<Sizes>,
      default: 'default',
    },
  },
});
</script>

<style scoped></style>
