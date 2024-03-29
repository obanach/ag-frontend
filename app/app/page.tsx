"use client";
import CreateNewHub from "@/app/app/components/CreateNewHub";
import React, {useEffect, useState} from "react";
import {HubCard, HubCardEmpty, HubCardPair, HubCardSkeleton} from "@/app/app/components/hub";
import {HubType} from "@/app/app/type";
import {Skeleton} from "@/components/ui/skeleton";
import {useAutoGrowApi} from "@/hooks/useAutoGrowApi";
import {toast} from "@/components/ui/use-toast";
import {PageHeader, PageHeaderHeading} from "@/components/page-header";
import {ChevronLeft} from "lucide-react";

export default function App() {

    const ag = useAutoGrowApi();

    const [hubs, setHubs] = React.useState<HubType[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    const load = () => {
        ag.makeGet('/app/hub/', [], (response) => {
            setHubs(response);
            setLoading(false);
        }, (error) => {
            toast({
                variant: 'destructive',
                description: error
            });
        })
    }

    const handleHubDeleted = (hub: HubType) => {
        setHubs(hubs.filter((h: HubType) => h.id !== hub.id));
    }

    const handleHubCreated = (hub: HubType) => {
        setHubs([hub, ...hubs]);
    }

    const handleHubUpdated = (hub: HubType) => {
        setHubs(hubs.map((h: HubType) => h.id === hub.id ? hub : h));
    }

    // @ts-ignore
    useEffect(() => {
        load();
    }, []);

    if (loading) {
        return <AppSkeleton/>
    }

    return (
        <div>
            <PageHeader>
                <PageHeaderHeading>
                    List of hubs
                </PageHeaderHeading>
                <CreateNewHub onHubCreated={handleHubCreated}/>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {
                    loading
                        ? <>
                            <HubCardSkeleton/><HubCardSkeleton/><HubCardSkeleton/><HubCardSkeleton/><HubCardSkeleton/></>
                        : hubs.length === 0
                            ? <div className="col-span-3"><HubCardEmpty/></div>
                            : hubs.map((hub: HubType) => (
                                <div className="col-span-1" key={hub.id}>
                                    {
                                        hub.pairCode == null
                                            ? <HubCard hub={hub} onHubDeleted={handleHubDeleted}/>
                                            : <HubCardPair hub={hub} onHubDeleted={handleHubDeleted}
                                                           onHubUpdated={handleHubUpdated}/>
                                    }
                                </div>
                            ))
                }
            </div>
        </div>
    );
}

const AppSkeleton: React.FC = () => {
    return (
        <div className={''}>
            <div className={'mb-5 flex items-center'}>
                <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] mr-auto">
                    <Skeleton className="h-12 w-56"/>
                </h2>
                <Skeleton className="h-10 w-24"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <HubCardSkeleton/>
                <HubCardSkeleton/>
                <HubCardSkeleton/>
                <HubCardSkeleton/>
                <HubCardSkeleton/>
            </div>
        </div>
    )
}
