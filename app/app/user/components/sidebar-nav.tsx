"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {HTMLAttributes} from "react";


export function SidebarNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <Link
          href={'/app/user/notifications'}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === '/app/user/notifications'
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
            Notifications
      </Link>
        <Link
            href={'/app/user/settings'}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === '/app/user/settings'
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                "justify-start"
            )}
        >
            Settings
        </Link>
    </nav>
  )
}