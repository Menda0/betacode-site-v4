"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { IconInbox } from "@tabler/icons-react"
import { AdminNavMain } from "@/components/admin/admin-nav-main"
import { AdminNavUser } from "@/components/admin/admin-nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Contacts",
    url: "/admin",
    icon: IconInbox,
  },
]

type AdminAppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  userName?: string
  userEmail?: string
}

export function AdminAppSidebar({
  userName,
  userEmail,
  ...props
}: AdminAppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/admin">
                <Image
                  src="/images/logo-light.svg"
                  alt="Betacode"
                  width={120}
                  height={32}
                  className="h-7 w-auto dark:hidden"
                />
                <Image
                  src="/images/logo-dark.svg"
                  alt="Betacode"
                  width={120}
                  height={32}
                  className="h-7 w-auto not-dark:hidden"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AdminNavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <AdminNavUser
          user={{
            name: userName ?? userEmail ?? "Admin",
            email: userEmail ?? "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
