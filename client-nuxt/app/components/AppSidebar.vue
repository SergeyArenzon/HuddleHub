<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/composables/useAuth'

// Use the auth composable to get user data and logout function
const { user, logout } = useAuth()
const router = useRouter()

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
  // Use the logout function from our auth composable
  logout()
  // Redirect to signin page
  router.push('/signin')
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
      <!-- Main sections -->
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
      <!-- User profile with dropdown menu -->
      <div class="relative">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <button class="flex w-full items-center gap-3 rounded-md p-2 text-left cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Avatar class="h-9 w-9">
                <AvatarImage :src="user.image_url" :alt="user.first_name" referrerpolicy="no-referrer" />
                <AvatarFallback class="bg-primary text-primary-foreground">
                  {{ `${user.first_name.charAt(0)}${user.last_name.charAt(0)}` }}
                </AvatarFallback>
              </Avatar>
              <div class="flex-1 overflow-hidden">
                <p class="text-sm font-medium leading-none truncate">{{ `${user.first_name} ${user.last_name}` }}</p>
                <p class="text-xs text-muted-foreground truncate">{{ user.email }}</p>
              </div>
              <ChevronUp class="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-[200px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User class="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard class="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings class="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="signOut">
              <LogOut class="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<style scoped>
.animate-in {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>