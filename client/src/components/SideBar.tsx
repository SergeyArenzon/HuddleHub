'use client'

import * as React from 'react'
import { LayoutDashboard, FileText, FileSpreadsheet, Folder, User, CreditCard, LogOut, ChevronDown, ChevronUp  } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from 'next-auth/react'
import { Avatar } from './Avatar'
import { Separator } from './ui/separator'

// This is sample data. In a real application, you'd fetch this from an API or database.

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "invoices", label: "Invoices", icon: FileSpreadsheet },
  { id: "documents", label: "Documents", icon: FileText },
]

export function Sidebar() {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { data } = useSession();

  return (
    <div className="flex h-screen">
      <aside className={cn(
        " bg-gray-100 p-4 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"xl"} variant="no_hover"  className="w-full justify-start gap-2 px-2 py-2">
                <Avatar 
                  src={data?.user?.image} 
                  fallback={`${data?.user?.name?.split(' ').at(0)?.at(0)}${data?.user?.name?.split(' ')[1][0]}`}/>
                <div className="flex flex-col items-start">
                  <span className="font-semibold">{data?.user?.name}</span>
                  <span className="text-xs text-muted-foreground">{data?.user?.email}</span>
                </div>
                <div>
                  <ChevronUp />
                  <ChevronDown />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <Separator />
            <DropdownMenuContent 
              className="w-56 bg-white border border-gray-200 shadow-lg z-50" 
              align="start"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <Separator />
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Separator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ScrollArea className="h-[calc(100vh-6rem)]">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full justify-start",
                  activeTab === tab.id && "bg-muted"
                )}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </div>
  )
}

