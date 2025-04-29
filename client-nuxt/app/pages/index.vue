<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/composables/useAuth'

// Get authentication status
const { isAuthenticated } = useAuth()
</script>


<template>
  <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
      
    </main>
  </SidebarProvider>
</template>