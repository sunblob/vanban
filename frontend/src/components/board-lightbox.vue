<template>
  <v-lightbox :isOpen="isOpen"> </v-lightbox>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VLightbox from './ui/modal/v-lightbox.vue';

export default defineComponent({
  components: {
    VLightbox,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped></style>
