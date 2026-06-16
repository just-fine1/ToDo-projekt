<template>

  <v-container class="d-flex justify-center align-center fill-height">

    <v-card class="pa-6" max-width="420" elevation="6" rounded="lg">

      <v-card-title class="text-h5 font-weight-bold justify-center">

        Login

      </v-card-title>

      <v-card-subtitle class="text-center mb-4">

        Bitte einloggen um fortzufahren

      </v-card-subtitle>

      <v-form @submit.prevent="login">

        <v-text-field

          v-model="email"

          label="Email"

          type="email"

          variant="outlined"

          prepend-inner-icon="mdi-email"

          class="mb-3"

        />

        <v-text-field

          v-model="password"

          label="Password"

          type="password"

          variant="outlined"

          prepend-inner-icon="mdi-lock"

          class="mb-3"

        />

        <p v-if="errorMessage" class="text-red text-caption mb-2">

          {{ errorMessage }}

        </p>

        <v-btn

          type="submit"

          color="primary"

          block

          size="large"

          class="mt-2"

        >

          Login

        </v-btn>

      </v-form>

    </v-card>

  </v-container>

</template>

<script setup>

import { ref } from 'vue'

import { useRouter } from 'vue-router'

import { supabase } from "../lib/supabase"

const email = ref('')

const password = ref('')

const errorMessage = ref('')

const router = useRouter()

const login = async () => {

  errorMessage.value = ''

  // Validation

  if (!email.value.trim()) {

    errorMessage.value = 'Email is required'

    return

  }

  if (!password.value) {

    errorMessage.value = 'Password is required'

    return

  }

  // Supabase login

  const { data, error } = await supabase.auth.signInWithPassword({

    email: email.value,

    password: password.value

  })

  if (error) {

    errorMessage.value = error.message

    return

  }

  if (data.session) {

    router.push('/auth')

  }

}

</script>

<style scoped>

.login-container {

  max-width: 400px;

  margin: 50px auto;

}

.error {

  color: red;

}

</style>