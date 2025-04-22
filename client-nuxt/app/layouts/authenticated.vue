<script setup lang="ts">
// Authenticated layout with sidebar and other components for logged-in users
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <AppSidebar />
    <div class="flex-1 p-6">
      <slot />
    </div>
  </div>
</template> 