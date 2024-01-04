import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";

interface Props {
    hubid: number
    classname?: string
}

const HubNavigation: React.FC<Props> = ({hubid, classname}: Props) => {
    const pathname = usePathname();

    return (
        <NavigationMenu className={classname}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href={'/app/hub/' + hubid} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname == '/app/hub/' + hubid}>
                            Modules
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={'/app/hub/' + hubid + '/actions'} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname == '/app/hub/' + hubid + '/actions'}>
                            Actions
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={'/app/hub/' + hubid + '/logs'} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname == '/app/hub/' + hubid + '/logs'}>
                            Logs
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={'/app/hub/' + hubid + '/settings'} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname == '/app/hub/' + hubid + '/settings'}>
                            Settings
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default HubNavigation;