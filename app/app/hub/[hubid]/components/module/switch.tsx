import {CircleIcon} from "@radix-ui/react-icons"
import {Card, CardFooter} from "@/components/ui/card"
import {Switch} from "@/components/ui/switch";
import * as React from "react";
import {FanIcon, ToggleLeft} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import ModuleTitle from "@/app/app/hub/[hubid]/components/module/title";

interface Props {
    name: string | null
}

const SwitchModule: React.FC<Props> = ({name}: Props) => {
    return (
        <Card className={'w-full h-full flex items-center'}>
            <div className="flex w-full justify-between p-5">
                <div className="flex items-center space-x-2">
                    <div className="hidden items-center justify-center w-20 h-20 rounded-md md:flex">
                        <ToggleLeft strokeWidth="0.75" className="w-16 h-16"/>
                    </div>
                    <div className="flex flex-col justify-items-stretch">
                        <ModuleTitle>{name}</ModuleTitle>
                        <div className="flex space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <CircleIcon className="mr-1 h-3 w-3 fill-green-400 text-green-400"/>
                                Online
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <Switch id="airplane-mode"/>
                </div>
            </div>
        </Card>
    )
}

const SwitchModuleSkeleton: React.FC = () => {
    return (
        <Card className={'w-full h-full flex items-center'}>
            <div className="flex w-full justify-between p-5">
                <div className="flex items-center space-x-2">
                    <div className="hidden items-center justify-center rounded-md md:flex">
                        <Skeleton className="h-16 w-16"/>
                    </div>
                    <div className="flex flex-col justify-items-stretch">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-3">
                            <Skeleton className="h-8 w-36"/>
                        </h3>
                        <div className="flex space-x-4 text-sm text-muted-foreground">
                            <Skeleton className="h-4 w-16"/>
                            <Skeleton className="h-4 w-16"/>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Skeleton className="h-8 w-12"/>
                </div>
            </div>
        </Card>
    )
}

export {SwitchModule, SwitchModuleSkeleton}