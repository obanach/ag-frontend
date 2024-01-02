"use client";
import { Avatar,  AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useAuth} from "@/hooks/useAuth";
import Link from "next/link";

export function UserNav() {

  const user = useAuth().getUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar || ''} alt={'User avatar'} />
            <AvatarFallback>OB</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              @{user?.username}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={'/app/user/notifications'}><DropdownMenuItem>Notifications</DropdownMenuItem></Link>
          <Link href={'/app/user/settings'}><DropdownMenuItem>Settings</DropdownMenuItem></Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href={'/auth/logout'}><DropdownMenuItem>Log out</DropdownMenuItem></Link>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}