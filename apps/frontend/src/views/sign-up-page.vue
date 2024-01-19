<template>
  <div class="flex items-center justify-center h-full">
    <sign-up-form @submit="handleSubmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'pinia';
import { useAuth } from '@/stores/auth';

import SignUpForm from '@/components/forms/sign-up-form.vue';

export default defineComponent({
  components: { SignUpForm },

  methods: {
    ...mapActions(useAuth, ['register']),

    async handleSubmit({ email, password }: { email: string; password: string }) {
      try {
        await this.register(email, password);

        this.$router.push({ name: 'boards' });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>

<style scoped></style>
