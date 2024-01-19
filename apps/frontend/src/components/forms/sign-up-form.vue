<template>
  <div class="w-[376px] rounded-md shadow-md px-4 py-6">
    <div class="text-xl mb-3 text-emerald-500">Vanban</div>
    <div class="text-2xl mb-2">Sign up</div>
    <form class="flex flex-col gap-y-4">
      <div v-auto-animate class="flex flex-col gap-2">
        <label for="email">Email address</label>
        <input
          v-model="form.email"
          type="text"
          name="email"
          id="email"
          class="rounded p-2 focus-visible:outline-none border border-gray-300 focus-visible:ring-1 ring-black ring-0 w-full"
          :class="{ 'border-red-600': errors.email }"
          @blur="validateEmail"
        />
        <span v-if="errors.email" class="text-sm text-red-600">{{ errors.email }}</span>
      </div>
      <div v-auto-animate class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input
          v-model="form.password"
          type="password"
          name="password"
          id="password"
          class="rounded p-2 focus-visible:outline-none border border-gray-300 focus-visible:ring-1 ring-black ring-0 w-full"
          :class="{ 'border-red-600': errors.password }"
          @blur="validatePassword"
        />
        <span v-if="errors.password" class="text-sm text-red-600">{{ errors.password }}</span>
      </div>
      <div v-auto-animate class="flex flex-col gap-2">
        <div class="flex items-center gap-x-2">
          <input
            v-model="form.terms"
            id="terms"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
          />
          <label for="terms" class="">Agree with terms</label>
        </div>
        <span v-if="errors.terms" class="text-sm text-red-600">{{ errors.terms }}</span>
      </div>

      <v-button full-width @click.prevent="submit">Continue</v-button>
    </form>
    <div class="flex gap-x-2 items-center mt-4">
      Have account?
      <v-button variant="ghost">
        <router-link :to="{ name: 'sign-in' }"> Sign in </router-link>
      </v-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import VButton from '@/components/ui/v-button.vue';

const emailReg = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

export default defineComponent({
  components: {
    RouterLink,
    VButton,
  },

  emits: ['submit'],

  data() {
    return {
      form: {
        email: '',
        password: '',
        terms: false,
      },
      errors: {
        email: '',
        password: '',
        terms: '',
      },
    };
  },

  methods: {
    validate() {
      this.validateEmail();
      this.validatePassword();
      this.validateTerms();
    },

    validateEmail() {
      if (!this.form.email && !this.form.email.trim().length) {
        this.errors.email = 'Email is required';
      } else if (!emailReg.test(this.form.email)) {
        this.errors.email = 'Email is invalid';
      } else {
        this.errors.email = '';
      }
    },

    validatePassword() {
      if (!this.form.password && !this.form.password.trim().length) {
        this.errors.password = 'Password is required';
      } else if (this.form.password.trim().length < 6) {
        this.errors.password = 'Password must be at least 6 characters';
      } else {
        this.errors.password = '';
      }
    },

    validateTerms() {
      if (!this.form.terms) {
        this.errors.terms = 'You must agree with terms';
      } else {
        this.errors.terms = '';
      }
    },

    submit() {
      this.validate();

      if (this.errors.email || this.errors.password || this.errors.terms) {
        return;
      }

      this.$emit('submit', this.form);
    },
  },
});
</script>

<style scoped></style>
