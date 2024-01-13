"use client";
import CreateNewHub from "@/app/app/components/CreateNewHub";
import React, {useEffect, useState} from "react";
import {HubCard, HubCardEmpty, HubCardPair, HubCardSkeleton} from "@/app/app/components/hub";
import {HubType} from "@/app/app/type";
import {Skeleton} from "@/components/ui/skeleton";
import {useAutoGrowApi} from "@/hooks/useAutoGrowApi";
import {toast} from "@/components/ui/use-toast";

export default function App() {

    const ag = useAutoGrowApi();

    const [hubs, setHubs] = React.useState([]);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        ag.makeGet('/app/hub/', [], (response) => {
            setHubs(response);
            setLoading(false);
        }, (error) => {
            toast({
                variant: 'destructive',
                description: error
            });
        })
    }, []);

    if (loading) {
        return <AppSkeleton/>
    }

    return (
        <div>
            <div className={'mb-5 flex items-center'}>
                <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] mr-auto">
                    List of hubs
                </h2>
                <CreateNewHub/>
            </div>
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
                                            ? <HubCard id={hub.id} name={hub.name} modules={hub.modulesCount}/>
                                            : <HubCardPair id={hub.id} name={hub.name} pairCode={hub.pairCode}/>
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
