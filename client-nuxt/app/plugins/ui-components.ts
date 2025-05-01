import { defineNuxtPlugin } from '#app'
import { 
  SidebarProvider, 
  Sidebar,
  SidebarHeader, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarFooter,
  SidebarRail 
} from '@/components/ui/sidebar'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

export default defineNuxtPlugin((nuxtApp) => {
  // Register sidebar components
  nuxtApp.vueApp.component('SidebarProvider', SidebarProvider)
  nuxtApp.vueApp.component('Sidebar', Sidebar)
  nuxtApp.vueApp.component('SidebarHeader', SidebarHeader)
  nuxtApp.vueApp.component('SidebarContent', SidebarContent)
  nuxtApp.vueApp.component('SidebarGroup', SidebarGroup)
  nuxtApp.vueApp.component('SidebarGroupLabel', SidebarGroupLabel)
  nuxtApp.vueApp.component('SidebarGroupContent', SidebarGroupContent)
  nuxtApp.vueApp.component('SidebarMenu', SidebarMenu)
  nuxtApp.vueApp.component('SidebarMenuItem', SidebarMenuItem)
  nuxtApp.vueApp.component('SidebarMenuButton', SidebarMenuButton)
  nuxtApp.vueApp.component('SidebarFooter', SidebarFooter)
  nuxtApp.vueApp.component('SidebarRail', SidebarRail)
  
  // Register dropdown components
  nuxtApp.vueApp.component('DropdownMenu', DropdownMenu)
  nuxtApp.vueApp.component('DropdownMenuTrigger', DropdownMenuTrigger)
  nuxtApp.vueApp.component('DropdownMenuContent', DropdownMenuContent)
  nuxtApp.vueApp.component('DropdownMenuItem', DropdownMenuItem)
  nuxtApp.vueApp.component('DropdownMenuLabel', DropdownMenuLabel)
  nuxtApp.vueApp.component('DropdownMenuSeparator', DropdownMenuSeparator)
  
  // Register other UI components
  nuxtApp.vueApp.component('Avatar', Avatar)
  nuxtApp.vueApp.component('AvatarImage', AvatarImage)
  nuxtApp.vueApp.component('AvatarFallback', AvatarFallback)
  nuxtApp.vueApp.component('Input', Input)
}) 