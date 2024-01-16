<template>
  <v-modal :is-open="isOpen" @close="close">
    <div v-if="card" class="w-[500px] rounded p-6 bg-gray-800 text-white">
      <div class="flex items-start gap-x-3 mb-6 w-full">
        <layout-icon class="h-5 w-5 mt-1 text-white" />
        <div class="w-full">
          <input
            id="title"
            :value="card.title"
            class="font-semibold text-xl px-1 text-white bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-gray-700 focus-visible:border-input mb-0.5 truncate"
          />
          <p class="text-sm text-gray-400">
            in list <span class="underline">{{ card.list.title }}</span>
          </p>
        </div>
      </div>
      <div class="flex gap-x-4 mb-6">
        <div class="flex items-start gap-x-3 w-full">
          <align-left-icon class="h-5 w-5 mt-1 text-white" />
          <textarea
            id="description"
            :value="card.description"
            class="text-sm text-white bg-gray-700 border-transparent rounded w-full resize-none p-2 h-full"
          ></textarea>
        </div>
        <div class="flex flex-col">
          <div class="space-y-2">
            <p class="text-xs font-semibold">Actions</p>
            <v-button
              variant="ghost"
              class="w-full justify-start flex items-center cursor-pointer border border-gray-500"
              size="sm"
            >
              <save-icon class="h-4 w-4 mr-2" />
              Save
            </v-button>
            <v-button
              variant="ghost"
              class="w-full justify-start flex items-center cursor-pointer border border-gray-500"
              size="sm"
              @click="handleCopy"
            >
              <copy-icon class="h-4 w-4 mr-2" />
              Copy
            </v-button>
            <v-button
              variant="ghost"
              class="w-full justify-start flex items-center cursor-pointer border border-gray-500"
              size="sm"
              @click="handleDelete"
            >
              <trash-icon class="h-4 w-4 mr-2" />
              Delete
            </v-button>
          </div>
        </div>
      </div>
    </div>
  </v-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { LayoutIcon, AlignLeftIcon, TrashIcon, CopyIcon, SaveIcon } from 'lucide-vue-next';
import { useCardModal } from '@/stores/card-modal';
import VModal from './ui/modal/v-modal.vue';
import VButton from './ui/v-button.vue';
import { useBoardStore } from '@/stores/board';

export default defineComponent({
  components: {
    VModal,
    LayoutIcon,
    AlignLeftIcon,
    TrashIcon,
    CopyIcon,
    SaveIcon,
    VButton,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState(useCardModal, ['id', 'isCardOpen', 'card']),
  },

  methods: {
    ...mapActions(useCardModal, ['close', 'loadCardInfo']),
    ...mapActions(useBoardStore, ['deleteCard']),

    handleCopy() {
      this.close();
    },

    handleDelete() {
      this.deleteCard(this.id!);

      this.close();
    },
  },

  watch: {
    id() {
      this.loadCardInfo();
    },
  },
});
</script>

<style scoped></style>
