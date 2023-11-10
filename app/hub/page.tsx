"use client"
import {PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/components/page-header";
import {Button} from "@/components/ui/button";
import {FanSwitch} from "@/app/hub/components/fan-switch";
import {LightSwitch} from "@/app/hub/components/light-switch";
import {ChevronLeft} from "lucide-react";
import {Environment} from "@/app/hub/components/module/environment";
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
            <PageHeader className="pb-8">
                <Button variant="ghost">
                    <ChevronLeft className="h-4 w-4" />
                    Back to hub list
                </Button>
                <PageHeaderHeading>
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
            </PageHeader>
            <div className="grid grid-rows-3 grid-cols-2 gap-5">
              <div className="row-span-3"><Environment /></div>
              <div className="row-span-1"><LightSwitch /></div>
              <div className="row-span-1"><FanSwitch /></div>
            </div>
        </div>
    );
}

export default HubPage;