<template>
  <v-modal :is-open="isOpen" @close="close">
    <div v-if="card" class="w-[500px] rounded p-6 bg-gray-800 text-white">
      <div class="flex items-start gap-x-3 mb-6 w-full">
        <layout-icon class="h-5 w-5 mt-1 text-white" />
        <div class="w-full">
          <input
            id="title"
            v-model="card.title"
            class="font-semibold text-xl px-1 text-white bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-gray-700 focus-visible:border-input mb-0.5 truncate"
            @blur="handleUpdateTitle"
          />
          <p class="text-sm text-gray-400">
            in list <span class="underline">{{ card.list.title }}</span>
          </p>
        </div>
      </div>
      <div class="flex gap-x-4 mb-6">
        <div class="flex items-start gap-x-3 w-full">
          <align-left-icon class="h-5 w-5 mt-1 text-white" />
          <div
            v-if="!isEditingDescription"
            @click="isEditingDescription = true"
            class="w-full h-full"
          >
            {{ card.description ? card.description : 'Add a description...' }}
          </div>
          <div v-else class="flex flex-col gap-y-2 w-full h-full">
            <textarea
              id="description"
              v-model="card.description"
              class="text-sm text-white bg-gray-700 border-transparent rounded w-full resize-none p-2 h-full"
            ></textarea>
            <div class="flex gap-x-4">
              <v-button variant="ghost" size="sm" @click="handleSave"> Save </v-button>
              <v-button size="sm" @click="isEditingDescription = false"> Cancel </v-button>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="space-y-2">
            <p class="text-xs font-semibold">Actions</p>

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
import { LayoutIcon, AlignLeftIcon, TrashIcon, CopyIcon } from 'lucide-vue-next';
import { useCardModal } from '@/stores/card-modal';
import { useBoardStore } from '@/stores/board';
import VModal from './ui/modal/v-modal.vue';
import VButton from './ui/v-button.vue';

export default defineComponent({
  components: {
    VModal,
    LayoutIcon,
    AlignLeftIcon,
    TrashIcon,
    CopyIcon,
    VButton,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isEditingDescription: false,
      title: '',
      description: '',
    };
  },

  computed: {
    ...mapState(useCardModal, ['id', 'isCardOpen', 'card']),
  },

  methods: {
    ...mapActions(useCardModal, ['close', 'loadCardInfo']),
    ...mapActions(useBoardStore, ['deleteCard', 'copyCard', 'updateCard']),

    handleCopy() {
      this.close();

      this.copyCard(this.id!);
    },

    handleDelete() {
      this.deleteCard(this.id!);

      this.close();
    },

    handleUpdateTitle() {
      if (this.title === this.card?.title) return;

      this.updateCard({
        id: this.id!,
        title: this.card!.title,
      });
    },

    handleSave() {
      this.isEditingDescription = false;

      this.updateCard({
        id: this.id!,
        description: this.card!.description,
      });
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
