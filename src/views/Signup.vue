<template>

  <v-container class="d-flex justify-center align-center fill-height">

    <v-card class="pa-6" max-width="420" elevation="6" rounded="lg">

      <v-card-title class="text-h5 font-weight-bold justify-center">

        Create Account

      </v-card-title>

      <v-card-subtitle class="text-center mb-4">

        Account erstellen

      </v-card-subtitle>

      <v-form @submit.prevent="register">

        <!-- EMAIL -->

        <v-text-field

          v-model="email"

          label="Email"

          type="email"

          variant="outlined"

          prepend-inner-icon="mdi-email"

          class="mb-3"

        />

        <!-- PASSWORD -->

        <v-text-field

          v-model="password"

          label="Password"

          type="password"

          variant="outlined"

          prepend-inner-icon="mdi-lock"

          class="mb-3"

        />

        <!-- CONFIRM PASSWORD -->

        <v-text-field

          v-model="confirmPassword"

          label="Confirm Password"

          type="password"

          variant="outlined"

          prepend-inner-icon="mdi-lock-check"

          class="mb-3"

        />

        <!-- ERROR -->

        <p v-if="errorMessage" class="text-red text-caption mb-2">

          {{ errorMessage }}

        </p>

        <!-- SUCCESS -->

        <p v-if="successMessage" class="text-green text-caption mb-2">

          {{ successMessage }}

        </p>

        <!-- BUTTON -->

        <v-btn

          type="submit"

          color="primary"

          block

          size="large"

          class="mt-2"

        >

          Register

        </v-btn>

      </v-form>

    </v-card>

  </v-container>

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