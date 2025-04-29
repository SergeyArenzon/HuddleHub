<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
console.log({error: props.error});

</script>

<template>
  <Error
      description="Sorry, we couldn't find the page you're looking for." 
      title="Page not found"/>
</template>