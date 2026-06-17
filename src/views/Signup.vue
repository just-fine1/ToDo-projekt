<template>

  <div class="signup-container">

    <h1>Create Account</h1>

    <form @submit.prevent="register">

      <div>

        <label>Email</label>

        <input

          v-model="email"

          type="email"

          placeholder="Enter email"

        />

      </div>

      <div>

        <label>Password</label>

        <input

          v-model="password"

          type="password"

          placeholder="Enter password"

        />

      </div>

      <div>

        <label>Confirm Password</label>

        <input

          v-model="confirmPassword"

          type="password"

          placeholder="Confirm password"

        />

      </div>

      <p v-if="errorMessage" class="error">

        {{ errorMessage }}

      </p>

      <p v-if="successMessage" class="success">

        {{ successMessage }}

      </p>

      <button type="submit">

        Register

      </button>

    </form>

  </div>

</template>

<script setup>

import { ref } from 'vue'

import { supabase } from "../lib/supabase"

import { useUserStore } from '../store/user'

const userStore = useUserStore()

const email = ref('')

const password = ref('')

const confirmPassword = ref('')

const errorMessage = ref('')

const successMessage = ref('')

const register = async () => {

  errorMessage.value = ''

  successMessage.value = ''

  if (!email.value.trim()) {

    errorMessage.value = 'Email is required'

    return

  }

  if (!password.value) {

    errorMessage.value = 'Password is required'

    return

  }

  if (password.value !== confirmPassword.value) {

    errorMessage.value = 'Passwords do not match'

    return

  }

  try {

  await userStore.signUp(email.value, password.value);

  successMessage.value =

    "Please check your email and click the confirmation link.";

  email.value = "";

  password.value = "";

  confirmPassword.value = "";

} catch (error) {

  errorMessage.value = error.message;

}

}

</script>

<style scoped>

.signup-container {

  max-width: 400px;

  margin: 50px auto;

}

.error {

  color: red;

}

.success {

  color: green;

}

</style>