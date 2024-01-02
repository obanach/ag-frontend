"use client";
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { MobileNav } from "@/components/mobile-nav";
import {useAuth} from "@/hooks/useAuth";
import {Button} from "@/components/ui/button";
import Link from "next/link";
export function SiteHeader() {

    const user = useAuth().getUser();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <MainNav />
                <MobileNav />
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center">
                        <ModeToggle />
                        {user ? (
                            <Button asChild variant={'outline'}>
                                <Link href={'/app'}>Go to App</Link>
                            </Button>
                        ) : (
                            <Button asChild>
                                <Link href={'/auth/login'}>Log in</Link>
                            </Button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}