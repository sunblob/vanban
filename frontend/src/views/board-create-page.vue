<template>
  <div class="p-4 container mx-auto">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold">Create a new board</h1>
      <v-button size="sm" variant="ghost" class="text-gray-500" @click="close">
        <x-icon class="w-6 h-6" />
      </v-button>
    </div>

    <div class="flex flex-col gap-y-4">
      <div class="flex flex-col gap-y-2">
        <label for="title" class="text-gray-500">Title</label>
        <input
          id="title"
          type="text"
          v-model="title"
          class="rounded-md bg-gray-100 px-2 py-1 focus-visible:outline-none focus-visible:ring w-full"
        />
      </div>

      <div class="flex flex-col gap-y-2">
        <label for="previewImage" class="text-gray-500">Preview image</label>
        <input
          id="previewImage"
          type="text"
          v-model="previewImage"
          class="rounded-md bg-gray-100 px-2 py-1 focus-visible:outline-none focus-visible:ring w-full"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { XIcon } from 'lucide-vue-next';
import VButton from '@/components/ui/v-button.vue';

export default defineComponent({
  components: {
    XIcon,
    VButton,
  },

  data() {
    return {
      title: '',
      previewImage: '',
    };
  },

  methods: {
    close() {
      this.$router.push({ name: 'boards' });
    },
  },
});
</script>

<style scoped></style>
