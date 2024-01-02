"use client"
import {PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/components/page-header";
import {Button} from "@/components/ui/button";
import {FanSwitch} from "@/app/app/hub/components/fan-switch";
import {LightSwitch} from "@/app/app/hub/components/light-switch";
import {ChevronLeft} from "lucide-react";
import {Environment} from "@/app/app/hub/components/module/environment";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";


function HubPage() {
    return (
        <div>
            <div className="pb-3">
                <Button variant="ghost" asChild>
                    <Link href={'/app'}>
                        <ChevronLeft className="h-4 w-4" />
                        Back to list
                    </Link>
                </Button>
                <PageHeaderHeading className={'mt-2 mb-8'}>
                    <span className={"text-gray-300 dark:text-gray-800 mr-2 "}>
                        #1
                    </span> My first Hub
                </PageHeaderHeading>
                <PageHeaderDescription>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/hub" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/hub/modules" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Modules</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/hub/logs" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Logs</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem><NavigationMenuItem>
                            <Link href="/hub/settings" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Settings</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                </PageHeaderDescription>
            </div>
            <div className="grid grid-rows-3 grid-cols-2 gap-5">
              <div className="row-span-3"><Environment /></div>
              <div className="row-span-1"><LightSwitch /></div>
              <div className="row-span-1"><FanSwitch /></div>
            </div>
        </div>
    );
}

export default HubPage;