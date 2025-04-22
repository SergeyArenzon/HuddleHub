<script setup lang="ts">
import { Button } from '@/components/ui/button'
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
      <div>
        <!-- Content for authenticated users -->
        <div v-if="isAuthenticated" class="max-w-4xl mx-auto">
          <h1 class="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
              <div class="space-y-4">
                <div class="p-3 border rounded-md">
                  <p class="font-medium">Document updated</p>
                  <p class="text-sm text-gray-500">Yesterday at 4:30 PM</p>
                </div>
                <div class="p-3 border rounded-md">
                  <p class="font-medium">New comment</p>
                  <p class="text-sm text-gray-500">Today at 9:15 AM</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-xl font-semibold mb-4">Quick Stats</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-blue-50 rounded-md">
                  <p class="text-2xl font-bold">24</p>
                  <p class="text-sm text-gray-500">Active Tasks</p>
                </div>
                <div class="p-4 bg-green-50 rounded-md">
                  <p class="text-2xl font-bold">8</p>
                  <p class="text-sm text-gray-500">Completed</p>
                </div>
                <div class="p-4 bg-purple-50 rounded-md">
                  <p class="text-2xl font-bold">12</p>
                  <p class="text-sm text-gray-500">Messages</p>
                </div>
                <div class="p-4 bg-yellow-50 rounded-md">
                  <p class="text-2xl font-bold">5</p>
                  <p class="text-sm text-gray-500">Notifications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Content for non-authenticated users -->
        <div v-else class="max-w-4xl mx-auto text-center py-12">
          <h1 class="text-4xl font-bold mb-6">Welcome to HuddleHub</h1>
          <p class="text-xl text-gray-600 mb-8">Collaborate, communicate, and coordinate with your team in one place.</p>
          
          <div class="flex justify-center gap-4">
            <NuxtLink to="/signin" class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Sign In
            </NuxtLink>
            <button class="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>