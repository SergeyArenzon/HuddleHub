<template>
  <div class="p-4 border rounded">
    <h2 class="text-xl font-bold mb-4">Pinia Test Component</h2>
    <p class="mb-4">Count: {{ counter.count }}</p>
    <div class="space-x-2">
      <button 
        @click="counter.increment()" 
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
      <button 
        @click="counter.decrement()" 
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Decrement
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'
const counter = useCounterStore()
</script> 