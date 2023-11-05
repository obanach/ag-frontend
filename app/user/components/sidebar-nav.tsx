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
          href={'/user/profile'}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === '/user/profile'
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
            Profile
      </Link>
      <Link
          href={'/user/notifications'}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === '/user/notifications'
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
            Notifications
      </Link>
    </nav>
  )
}