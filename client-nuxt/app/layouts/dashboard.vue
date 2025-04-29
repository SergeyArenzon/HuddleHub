<script setup lang="ts">
// Authenticated layout with sidebar and other components for logged-in users
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div class="flex">
    <AppSidebar />
    <div class="flex-1 p-6">
      dashboard layout
      <slot />
    </div>
  </div>
</template> 