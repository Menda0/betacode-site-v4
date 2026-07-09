"use client"

import { IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "@/app/components/theme-provider"
import { cn } from "@/lib/utils"

export function AdminThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className={cn(
        "rounded-md p-2 transition-colors",
        "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
      )}
    >
      <IconSun className="size-5 dark:hidden" aria-hidden="true" />
      <IconMoon className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  )
}
