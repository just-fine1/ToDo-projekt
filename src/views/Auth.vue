<template>

  <div>

    <h2>Confirming account...</h2>

  </div>

</template>

<script setup>

import { onMounted } from 'vue'

import { useRouter } from 'vue-router'

import { supabase } from '../lib/supabase'

const router = useRouter()

onMounted(async () => {


  const { data } = await supabase.auth.getSession()

  if (!data.session) {

    router.push('/login')

    return

  }

  setTimeout(() => {

    router.push('/dashboard')

  }, 2000) 

})

</script>