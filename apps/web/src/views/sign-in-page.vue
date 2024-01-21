<template>
  <div class="flex items-center justify-center h-full">
    <sign-in-form @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { useAuth } from '@/stores/auth';

import SignInForm from '@/components/forms/sign-in-form.vue';

const { login } = useAuth();
const router = useRouter();

async function handleSubmit({ email, password }: { email: string; password: string }) {
  try {
    await login(email, password);
    router.push({ name: 'boards' });
  } catch (err) {
    console.log(err);
    toast.error('Invalid credentials');
  }
}
</script>

<style scoped></style>
