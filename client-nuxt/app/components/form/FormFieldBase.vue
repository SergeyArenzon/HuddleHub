<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  name: string
  label: string
  helperText?: string
  required?: boolean
  class?: HTMLAttributes['class']
  error?: string
}>()
</script>

<template>
  <div :class="`space-y-2 ${props.class || ''}`">
    <Label :for="name" class="flex items-center gap-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </Label>
    
    <slot />

    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
    <p v-else-if="helperText" class="text-sm text-muted-foreground">{{ helperText }}</p>
  </div>
</template> 