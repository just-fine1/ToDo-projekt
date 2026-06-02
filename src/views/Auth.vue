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

onMounted(() => {

  supabase.auth.onAuthStateChange((event, session) => {

    if (event === 'SIGNED_IN' && session) {

      router.push('/')

    }

  })

})

</script>