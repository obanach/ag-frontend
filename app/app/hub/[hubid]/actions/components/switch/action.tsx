import * as React from "react";
import {CheckCircle2, Info, XCircle} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Skeleton} from "@/components/ui/skeleton";

interface Props {
    id: number
    name: string
    moduleName: string
    time: number
    state: boolean
    active: boolean
    onActiveChange?: (id: number) => void
    onDelete?: (id: number) => void
}

function secondsToHm(seconds: number) {
    seconds = Number(seconds);
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);

    let hDisplay = h < 10 ? "0" + h : h;
    let mDisplay = m < 10 ? "0" + m : m;

    return hDisplay + ':' + mDisplay;
}

const Action: React.FC<Props> = ({id, name, moduleName, time, state, active, onActiveChange, onDelete}: Props) => {

    const deleteAction = () => {
        if (onDelete) {
            onDelete(id)
        }
    }

    const toggleActive = () => {
        if (onActiveChange) {
            onActiveChange(id)
        }
    }

    return (
        <div className={`flex items-center space-x-4 rounded-md border p-4`}>
            <CheckCircle2/>
            <div className="flex-1 space-y-2">
                <p className="text-md font-medium leading-none">
                    {name}
                </p>
                <p className="text-sm text-muted-foreground">
                    If time is <code
                    className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {secondsToHm(time)}
                </code> then set <code
                    className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold uppercase">
                    {moduleName}
                </code> to <Badge variant={state ? 'default' : 'outline'}>{state ? 'ON' : 'OFF'}</Badge>
                </p>
            </div>
            <div className={'flex items-center gap-3'}>
                <Switch checked={active} onCheckedChange={toggleActive}/>
                <Button variant="destructive" size="icon" onClick={(deleteAction)}>
                    <XCircle className="h-4 w-4"/>
                </Button>
            </div>
        </div>
    )
}

const ActionSkeleton: React.FC = () => {
    return (
        <div className={`flex items-center space-x-4 rounded-md border p-4`}>
            <Skeleton className="h-8 w-8"/>
            <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-24"/>
                <Skeleton className="h-4 w-44"/>
            </div>
            <div className={'flex items-center gap-3'}>
                <Skeleton className="h-8 w-14"/>
                <Skeleton className="h-8 w-8"/>
            </div>
        </div>
    )
}

const ActionEmpty: React.FC = () => {
    return (
        <Alert>
            <Info className="h-4 w-4"/>
            <AlertTitle>No actions!</AlertTitle>
            <AlertDescription>
                You have no actions created. Add new one by clicking on the button below.
            </AlertDescription>
        </Alert>
    )
}

export {Action, ActionEmpty, ActionSkeleton}