<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError
})

</script>

<template>
  <Error
      description="Sorry, we couldn't find the page you're looking for." 
      title="Page not found"/>
</template>