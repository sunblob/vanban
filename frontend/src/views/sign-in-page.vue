<template>
  <div class="flex items-center justify-center h-full">
    <sign-in-form @submit="handleSubmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'pinia';
import { toast } from 'vue-sonner';
import { useAuth } from '@/stores/auth';

import SignInForm from '@/components/forms/sign-in-form.vue';

export default defineComponent({
  components: { SignInForm },

  methods: {
    ...mapActions(useAuth, ['login']),

    async handleSubmit({ email, password }: { email: string; password: string }) {
      try {
        await this.login(email, password);
        this.$router.push({ name: 'boards' });
      } catch (err) {
        console.log(err);
        toast.error('Invalid credentials');
      }
    },
  },
});
</script>

<style scoped></style>
