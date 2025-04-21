<script setup lang="ts">
import { ref } from 'vue'
import {
  Settings,
  Users,
  FileText,
  BarChart3,
  Search,
  Bell,
  MessageSquare,
  User,
  LogOut,
  CreditCard,
  ChevronUp,
} from "lucide-vue-next"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"

import { Input } from "@/components/ui/input"

// User state management
// We'll need to use Nuxt's auth system or similar
// For now we'll use a reactive object
const user = ref({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  image_url: ''
})

const activeTab = ref('analytics')

const tabs = [
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "customers", label: "Customers", icon: Users },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: 5 },
  { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
  { id: "settings", label: "Settings", icon: Settings },
]

const signOut = () => {
  // Implement sign out functionality
  // This would typically use Nuxt auth
  console.log('Signing out')
}
</script>

<template>
  <Sidebar :side="'right'">
    <SidebarHeader>
      <div class="flex items-center justify-center px-4 py-2">
        <div class="flex h-8 px-1 items-center justify-center rounded-md bg-primary">
          <span class="text-lg font-bold text-primary-foreground">Rapid</span>
        </div>
        <div class="font-bold text-lg">Guide</div>
      </div>
      <div class="relative px-4 py-2">
        <Search class="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search..." class="pl-8 h-9" />
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="tab in tabs.slice(0, 3)" :key="tab.id">
              <SidebarMenuButton
                :isActive="activeTab === tab.id"
                @click="activeTab = tab.id"
              >
                <component :is="tab.icon" class="h-4 w-4" />
                <span>{{ tab.label }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Notifications</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="tab in tabs.slice(3, 5)" :key="tab.id">
              <SidebarMenuButton
                :isActive="activeTab === tab.id"
                @click="activeTab = tab.id"
              >
                <component :is="tab.icon" class="h-4 w-4" />
                <span>{{ tab.label }}</span>
                <span
                  v-if="tab.badge"
                  class="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
                >
                  {{ tab.badge }}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Preferences</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="tab in tabs.slice(5)" :key="tab.id">
              <SidebarMenuButton
                :isActive="activeTab === tab.id"
                @click="activeTab = tab.id"
              >
                <component :is="tab.icon" class="h-4 w-4" />
                <span>{{ tab.label }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter class="border-t p-4">
      <!-- Simplified user profile section since we don't have Avatar and DropdownMenu components -->
      <div class="flex w-full items-center gap-3 rounded-md p-2 text-left">
        <div class="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          {{ `${user.first_name.charAt(0)}${user.last_name.charAt(0)}` }}
        </div>
        <div class="flex-1 overflow-hidden">
          <p class="text-sm font-medium leading-none truncate">{{ `${user.first_name} ${user.last_name}` }}</p>
          <p class="text-xs text-muted-foreground truncate">{{ user.email }}</p>
        </div>
        <button @click="signOut" class="flex items-center text-muted-foreground hover:text-foreground">
          <LogOut class="h-4 w-4" />
        </button>
      </div>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>