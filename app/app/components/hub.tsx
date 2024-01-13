import * as React from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Info, Radio} from "lucide-react";
import {Icons} from "@/components/icons";
import DeleteHub from "@/app/app/components/DeleteHub";
import {HubType} from "@/app/app/type";
import RefreshHub from "@/app/app/components/RefreshHub";


interface Props {
    hub: HubType
    onHubDeleted?: (hub: HubType) => void
    onHubUpdated?: (hub: HubType) => void
}

interface CardHubProps {
    header: React.ReactNode
    content: React.ReactNode
    footer: React.ReactNode
    online?: boolean
}

const CardHub: React.FC<CardHubProps> = ({header, content, footer, online}: CardHubProps) => {
    return (
        <Card>
            <CardHeader className={'min-h-20'}>
                {header}
            </CardHeader>
            <CardContent className={'min-h-20'}>
                {content}
            </CardContent>
            <CardFooter className={'justify-between gap-3'}>
                <div className={'flex items-center'}>
                    {typeof online !== 'undefined' && (
                        <>
                            <Radio className={`mr-2 ${ online ? 'text-green-600' : 'text-red-600'}`}/>
                            <p className={'text-sm text-muted-foreground'}>{online ? 'Online' : 'Offline'}</p>
                        </>
                    )}
                </div>
                <div className={'flex justify-end gap-3'}>
                    {footer}
                </div>
            </CardFooter>
        </Card>
    )
}


const HubCard: React.FC<Props> = ({hub, onHubDeleted, onHubUpdated}: Props) => {
    return (
        <CardHub
            header={
                <>
                    <CardTitle>{hub.name}</CardTitle>
                    <CardDescription>Modules: {hub.modulesCount}</CardDescription>
                </>
            }
            content={
                <></>
            }
            online={hub.online}
            footer={
                <>
                    <RefreshHub hub={hub} onHubUpdated={onHubUpdated}/>
                    <DeleteHub hub={hub} onHubDeleted={onHubDeleted}/>
                    <Button asChild>
                        <Link href={'/app/hub/' + hub.id}>View</Link>
                    </Button>
                </>
            }
        />
    )
}

const HubCardPair: React.FC<Props> = ({hub, onHubDeleted, onHubUpdated}: Props) => {
    return (
        <CardHub
            header={
                <>
                    <CardTitle>{hub.name}</CardTitle>
                    <CardDescription>Pairing...</CardDescription>
                </>
            }
            content={
                <>
                    <div
                        className="text-4xl font-extrabold text-primary tracking-[.25em] lg:text-5xl text-center">
                        {hub?.pairCode}
                    </div>
                </>
            }
            online={hub.online}
            footer={
                <>
                    <RefreshHub hub={hub} onHubUpdated={onHubUpdated}/>
                    <DeleteHub hub={hub} onHubDeleted={onHubDeleted}/>
                </>
            }
        />
    )
}

const HubCardSkeleton: React.FC = () => {
    return (
        <CardHub
            header={
                <>
                    <Skeleton className="h-7 w-24"/>
                    <Skeleton className="h-4 w-44"/>
                </>
            }
            content={
                <>
                </>
            }
            footer={
                <>
                    <Skeleton className="h-10 w-10"/>
                    <Skeleton className="h-10 w-10"/>
                    <Skeleton className="h-10 w-16"/>
                </>
            }
        />
    )
}

const HubCardEmpty: React.FC = () => {
    return (
        <Alert>
            <Info className="h-4 w-4"/>
            <AlertTitle>No hubs!</AlertTitle>
            <AlertDescription>
                You have no hubs connected. Add new one by clicking on the button above.
            </AlertDescription>
        </Alert>
    )
}

export {HubCard, HubCardSkeleton, HubCardEmpty, HubCardPair}
