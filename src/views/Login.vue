<template>

  <div class="login-container">

    <h1>Login</h1>

    <form @submit.prevent="login">

      <div>

        <label>Email</label>

        <input v-model="email" type="email" placeholder="Enter email" />

      </div>

      <div>

        <label>Password</label>

        <input v-model="password" type="password" placeholder="Enter password" />

      </div>

      <p v-if="errorMessage" class="error">

        {{ errorMessage }}

      </p>

      <button type="submit">Log In</button>

    </form>

  </div>

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

    router.push('/')

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