import * as React from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Info} from "lucide-react";


interface Props {
    id: number
    name: string
    modules: number
}

const HubCard: React.FC<Props> = ({id, name, modules}: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{modules} modules</CardDescription>
            </CardHeader>
            <CardFooter className={'justify-end'}>
                <Button asChild>
                    <Link href={'/app/hub/' + id}>View</Link>
                </Button>
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

export {HubCard, HubCardSkeleton, HubCardEmpty}
