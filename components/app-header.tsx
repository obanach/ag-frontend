import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav";
import Link from "next/link";
import {siteConfig} from "@/config/site";
import React from "react";
export function AppHeader() {
    return (
        <div className="mt-5 mb-12 flex h-14 items-center">
            <Link href={'/app'} className={'font-bold'}>{siteConfig.name}</Link>
            <div className="flex flex-1 items-center space-x-2 justify-end">
                <nav className="flex items-center">
                    <ModeToggle/>
                    <UserNav/>
                </nav>
            </div>
        </div>
    )
}