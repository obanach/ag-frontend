import * as React from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Info} from "lucide-react";
import {Icons} from "@/components/icons";
import DeleteHub from "@/app/app/components/DeleteHub";
import {HubType} from "@/app/app/type";


interface Props {
    hub: HubType
    onHubDeleted?: (hub: HubType) => void
}

const HubCard: React.FC<Props> = ({hub, onHubDeleted}: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{hub.name}</CardTitle>
                <CardDescription>{hub.modulesCount} modules</CardDescription>
            </CardHeader>
            <CardFooter className={'justify-end gap-3'}>
                <DeleteHub hub={hub} onHubDeleted={onHubDeleted}/>
                <Button asChild>
                    <Link href={'/app/hub/' + hub.id}>View</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

const HubCardPair: React.FC<Props> = ({hub, onHubDeleted}: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{hub.name}</CardTitle>
                <CardDescription>Pair code: {hub.pairCode}</CardDescription>
            </CardHeader>
            <CardContent>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            </CardContent>
            <CardFooter className={'justify-end'}>
                <DeleteHub hub={hub} onHubDeleted={onHubDeleted} />
            </CardFooter>
        </Card>
    )
}

const HubCardSkeleton: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-24"/>
                <Skeleton className="h-4 w-44"/>
            </CardHeader>
            <CardFooter className={'justify-end'}>
                <Skeleton className="h-8 w-14"/>
            </CardFooter>
        </Card>
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
