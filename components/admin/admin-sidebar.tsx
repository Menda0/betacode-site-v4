"use client"

import { useState, type ComponentType, type SVGProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react"
import {
  IconInbox,
  IconLogout,
  IconMenu2,
  IconX,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { AdminThemeToggle } from "@/components/admin/theme-toggle"

type NavItem = {
  name: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const sidebarPanelClass =
  "relative flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200/60 bg-white/95 px-6 pb-4 backdrop-blur-lg dark:border-white/10 dark:bg-[#111828]/95 dark:after:pointer-events-none dark:after:absolute dark:after:inset-y-0 dark:after:right-0 dark:after:w-px dark:after:bg-white/10"

const mobileTopBarClass =
  "sticky top-0 z-40 flex items-center gap-x-4 border-b border-gray-200/60 bg-white/95 px-4 py-4 backdrop-blur-lg sm:px-6 lg:hidden dark:border-white/10 dark:bg-[#111828]/95"

const navigation: NavItem[] = [
  { name: "Contacts", href: "/admin", icon: IconInbox },
]

function getInitials(name?: string, email?: string) {
  if (name) {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }
  return (email?.slice(0, 2) ?? "AD").toUpperCase()
}

function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => {
              const isCurrent =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href))

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      isCurrent
                        ? "bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white",
                      "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={cn(
                        isCurrent
                          ? "text-primary-600 dark:text-primary-400"
                          : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300",
                        "size-6 shrink-0"
                      )}
                    />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </li>
      </ul>
    </nav>
  )
}

function UserFooter({
  userName,
  userEmail,
  onNavigate,
}: {
  userName?: string
  userEmail?: string
  onNavigate?: () => void
}) {
  const displayName = userName ?? userEmail ?? "Admin"

  return (
    <div className="-mx-6 mt-auto border-t border-gray-200/60 dark:border-white/10">
      <div className="flex items-center gap-x-3 px-6 py-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
          {getInitials(userName, userEmail)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm/6 font-semibold text-gray-900 dark:text-white">{displayName}</p>
          {userEmail && (
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            onNavigate?.()
            void signOut({ callbackUrl: "/admin/login" })
          }}
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
          aria-label="Sign out"
          title="Sign out"
        >
          <IconLogout className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function SidebarBrand() {
  return (
    <div className="flex h-16 shrink-0 items-center">
      <Image
        src="/images/logo-light.svg"
        alt="Betacode"
        width={200}
        height={54}
        className="h-8 w-auto dark:hidden"
        priority
      />
      <Image
        src="/images/logo-dark.svg"
        alt="Betacode"
        width={200}
        height={54}
        className="h-8 w-auto not-dark:hidden"
        priority
      />
    </div>
  )
}

function SidebarPanel({
  pathname,
  userName,
  userEmail,
  onNavigate,
}: {
  pathname: string
  userName?: string
  userEmail?: string
  onNavigate?: () => void
}) {
  return (
    <div className={sidebarPanelClass}>
      <SidebarBrand />
      <SidebarNav pathname={pathname} onNavigate={onNavigate} />
      <UserFooter
        userName={userName}
        userEmail={userEmail}
        onNavigate={onNavigate}
      />
    </div>
  )
}

type AdminShellProps = {
  children: React.ReactNode
  userName?: string
  userEmail?: string
}

export function AdminShell({ children, userName, userEmail }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const pageTitle = navigation.find((item) => item.href === pathname)?.name ?? "Admin"

  return (
    <div className="min-h-dvh">
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <IconX aria-hidden="true" className="size-6 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </TransitionChild>

            <SidebarPanel
              pathname={pathname}
              userName={userName}
              userEmail={userEmail}
              onNavigate={() => setSidebarOpen(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarPanel
          pathname={pathname}
          userName={userName}
          userEmail={userEmail}
        />
      </div>

      <div className={mobileTopBarClass}>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <span className="sr-only">Open sidebar</span>
          <IconMenu2 aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-sm/6 font-semibold text-gray-900 dark:text-white">{pageTitle}</div>
        <AdminThemeToggle />
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
          {getInitials(userName, userEmail)}
        </span>
      </div>

      <div className="lg:pl-72">
        <header className="hidden items-center justify-between border-b border-gray-200/60 bg-white/75 px-4 py-4 backdrop-blur-lg sm:px-6 lg:flex dark:border-white/10 dark:bg-[#111828]/95">
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-white">
              {pageTitle}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pricing calculator leads
            </p>
          </div>
          <AdminThemeToggle />
        </header>

        <main className="bg-gray-50 py-8 dark:bg-gray-950">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
