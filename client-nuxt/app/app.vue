<script setup lang="ts">
// Import layouts based on authentication status
import DashboardLayout from '@/layouts/dashboard.vue'
import AuthLayout from '@/layouts/auth.vue'
import { NuxtLayout } from '#components';

const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
</script>

<template>
  <NuxtLayout>
      <div class="min-h-screen bg-background">
        <NuxtRouteAnnouncer />
        <!-- Apply different layouts based on authentication state and route -->
        <DashboardLayout v-if="loggedIn">
          <NuxtPage />
        </DashboardLayout>
        
        <AuthLayout v-else>
          <NuxtPage />
        </AuthLayout>
      </div>
  </NuxtLayout>
</template>
