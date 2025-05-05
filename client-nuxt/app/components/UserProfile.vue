<template>
  <div class="p-4">
    <div v-if="isLoading">Loading user data...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <h2 class="text-2xl font-bold mb-4">User Profile</h2>
      <div v-if="user" class="space-y-4">
        <div>
          <p class="font-semibold">Name:</p>
          <p>{{ user.first_name }} {{ user.last_name }}</p>
        </div>
        <div>
          <p class="font-semibold">Email:</p>
          <p>{{ user.email }}</p>
        </div>
        
        <!-- Example of using the mutation -->
        <button 
          @click="updateUser({ first_name: 'New Name' })"
          :disabled="isUpdating"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {{ isUpdating ? 'Updating...' : 'Update Name' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUser } from '~/composables/useUser'

const { user, isLoading, error, updateUser, isUpdating } = useUser()
</script> 