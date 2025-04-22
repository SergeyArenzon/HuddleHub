<script setup lang="ts">
// Import layouts based on authentication status
import AuthenticatedLayout from './layouts/authenticated.vue'
import DefaultLayout from './layouts/default.vue'

// Use the auth composable to get authentication state
const { isAuthenticated } = useAuth()
console.log({isAuthenticated:isAuthenticated.value});

</script>

<template>
  <div class="min-h-screen bg-background">
    <NuxtRouteAnnouncer />
    
    <!-- Apply different layouts based on authentication state -->
    <AuthenticatedLayout v-if="isAuthenticated">
      <NuxtPage />
    </AuthenticatedLayout>
    
    <DefaultLayout v-else>
      <NuxtPage />
    </DefaultLayout>
  </div>
</template>
