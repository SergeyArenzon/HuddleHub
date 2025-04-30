<script setup lang="ts">
// Authenticated layout with sidebar and other components for logged-in users
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div class="flex h-screen w-full">
    <main class="flex-1 h-full">
      <slot />
    </main>
    <AppSidebar />
  </div>
</template> 