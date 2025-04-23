<script setup lang="ts">
import { AlertCircle, Home, RotateCcw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { PropType } from 'vue'

// Define props with default values
defineProps({
  statusCode: Number,
  title: {
    type: String,
    default: 'An error occurred'
  },
  description: {
    type: String,
    default: 'Something went wrong. Please try again later.'
  },
  iconComponent: {
    type: Object,
    default: () => AlertCircle
  },
  showHomeButton: {
    type: Boolean,
    default: true
  },
  showRetryButton: {
    type: Boolean,
    default: true
  },
  retryAction: {
    type: Function as PropType<() => void>,
    default: () => {}
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
    <div class="rounded-full bg-muted p-6 mb-6">
      <component 
        v-if="iconComponent"
        :is="iconComponent" 
        class="h-12 w-12 text-muted-foreground" 
        aria-hidden="true" 
      />
    </div>

    <div v-if="statusCode" class="text-sm font-medium text-muted-foreground mb-2">
      Error {{ statusCode }}
    </div>

    <h1 class="text-4xl font-bold tracking-tight mb-2">{{ title }}</h1>
    <p class="text-muted-foreground text-lg mb-8 max-w-md">{{ description }}</p>

    <div class="flex flex-col sm:flex-row gap-4">
      <Button 
        v-if="showRetryButton" 
        @click="retryAction" 
        variant="default"
      >
        <RotateCcw class="mr-2 h-4 w-4" />
        Try again
      </Button>

      <NuxtLink v-if="showHomeButton" to="/">
        <Button :variant="showRetryButton ? 'outline' : 'default'">
          <Home class="mr-2 h-4 w-4" />
          Go back home
        </Button>
      </NuxtLink>
    </div>
  </div>
</template> 