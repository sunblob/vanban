<template>
  <div class="p-4 container mx-auto">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold">Create a new board</h1>
      <v-button size="sm" variant="ghost" class="text-gray-500" @click="close">
        <x-icon class="w-6 h-6" />
      </v-button>
    </div>

    <div class="flex flex-col gap-y-4">
      <div class="text-gray-500">Preview image</div>
      <div class="grid grid-cols-4 gap-2">
        <div
          v-for="image in images"
          :key="image.id"
          class="h-[160px] cursor-pointer rounded"
          :class="{
            ring: selectedImage === image.id,
          }"
          @click="selectImage(image.id)"
        >
          <img :src="image.imagePreview" class="h-full w-full object-cover rounded" />
        </div>
      </div>

      <div class="flex flex-col gap-y-2">
        <label for="previewImage" class="text-gray-500">Title</label>
        <input
          id="previewImage"
          type="text"
          placeholder="Enter a title"
          v-model="title"
          class="rounded p-2 focus-visible:outline-none border border-gray-300 focus-visible:ring-1 ring-black ring-0 w-full"
        />
      </div>

      <v-button full-width @click="create">Create</v-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { XIcon } from 'lucide-vue-next';

import { useBoardActions } from '@/features/board/actions-state';

import VButton from '@/components/ui/v-button.vue';

const { createBoard } = useBoardActions();

const router = useRouter();

const title = ref('');
const selectedImage = ref(1);
const images = ref([
  {
    id: 1,
    image: '/images/desert.jpg',
    imagePreview: '/images/desert-preview.jpg',
  },
  {
    id: 2,
    image: '/images/tree.jpg',
    imagePreview: '/images/tree-preview.jpg',
  },
  {
    id: 3,
    image: '/images/tree-desert.jpg',
    imagePreview: '/images/tree-desert-preview.jpg',
  },
  {
    id: 4,
    image: '/images/lake.jpg',
    imagePreview: '/images/lake-preview.jpg',
  },
  {
    id: 5,
    image: '/images/mountain-lake.jpg',
    imagePreview: '/images/mountain-lake-preview.jpg',
  },
  {
    id: 6,
    image: '/images/mountain.jpg',
    imagePreview: '/images/mountain-preview.jpg',
  },
  {
    id: 7,
    image: '/images/pagoda.jpg',
    imagePreview: '/images/pagoda-preview.jpg',
  },
  {
    id: 8,
    image: '/images/fuji.jpg',
    imagePreview: '/images/fuji-preview.jpg',
  },
]);

function close() {
  router.push({ name: 'boards' });
}

function selectImage(imageId: number) {
  console.log(imageId);

  selectedImage.value = imageId;
}

function create() {
  const image = images.value.find((image) => image.id === selectedImage.value);

  if (image) {
    createBoard({
      title: title.value,
      image: image.image,
      previewImage: image.imagePreview,
    });

    close();
  }
}
</script>

<style scoped></style>
