<template>
  <div class="flex items-center justify-center h-full">
    <sign-up-form @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/auth';

import SignUpForm from '@/components/forms/sign-up-form.vue';

const { register } = useAuth();
const router = useRouter();

async function handleSubmit({ email, password }: { email: string; password: string }) {
  try {
    await register(email, password);
    router.push({ name: 'boards' });
  } catch (err) {
    console.log(err);
  }
}
</script>

<style scoped></style>
