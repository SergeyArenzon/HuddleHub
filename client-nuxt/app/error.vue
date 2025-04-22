<script setup lang="ts">
import type { NuxtError } from '#app'
import Error from './components/Error.vue'

defineProps({
  error: Object as () => NuxtError
})

</script>

<template>
    <div>
        <div>Debug text - Error component should appear below</div>
        
        <Error
            description="Sorry, we couldn't find the page you're looking for." 
            title="Page not found"/>
    </div>
</template>