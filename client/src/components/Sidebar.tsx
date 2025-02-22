"use client"
import { Bell, ChevronDown, CreditCard, Home, Inbox, LayoutDashboard, LogOut, Settings, User2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar as  ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import useUserStore from "@/store/useUser"

const navigation = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, url: "#", isActive: true },
      { title: "Home", icon: Home, url: "#" },
      { title: "Inbox", icon: Inbox, url: "#", badge: "5" },
      { title: "Notifications", icon: Bell, url: "#" },
    ],
  },
]

const userNavigation = [
  {
    title: "Profile",
    icon: User2,
  },
  {
    title: "Billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    icon: Settings,
  },
]

export default function Sidebar() {

  const user = useUserStore((state) => state.user);

  return (
    <SidebarProvider >
      <ShadcnSidebar side="right">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold">Acme Inc</span>
                  <span className="text-xs">Dashboard</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {navigation.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Avatar className="size-6">
                      <AvatarImage src={user?.image_url} />
                      <AvatarFallback>{user?.first_name.charAt(0)}{user?.last_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user?.first_name} {user?.last_name}</span>
                    <ChevronDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start" side="right">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {userNavigation.map((item) => (
                      <DropdownMenuItem key={item.title}>
                        <item.icon className="mr-2 size-4" />
                        <span>{item.title}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </ShadcnSidebar>
      <SidebarTrigger />
    </SidebarProvider>
  )
}

