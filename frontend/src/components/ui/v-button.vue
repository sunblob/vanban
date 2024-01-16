<template>
  <button
    class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    :class="{
      // variants
      'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
      'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
      'bg-background text-accent-foreground hover:bg-accent border': variant === 'ghost',
      'bg-red-500 hover:bg-red-800 text-white': variant === 'danger',
      // sizes
      'h-10 px-4 py-2': size === 'default',
      'h-9 rounded-md px-3': size === 'sm',
      'h-11 rounded-md px-8': size === 'lg',

      'w-full': fullWidth,
    }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

type Variants = 'primary' | 'secondary' | 'ghost' | 'danger';
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

    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped></style>
