"use client";
import {FanModule, FanModuleSkeleton} from "@/app/app/hub/[hubid]/components/module/fan";
import {LightModule, LightModuleSkeleton} from "@/app/app/hub/[hubid]/components/module/light";
import {EnvironmentModule, EnvironmentModuleSkeleton} from "@/app/app/hub/[hubid]/components/module/environment";
import React, {ReactNode, useEffect, useState} from "react";
import {PageHeader, PageHeaderDescription, PageSubHeaderHeading} from "@/components/page-header";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import HubNavigation from "@/app/app/hub/[hubid]/components/navigation";
import AddModule from "@/app/app/hub/[hubid]/components/AddModule";

interface props {
    params: { hubid: number }
}
function HubPage({params}: props) {
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, []);

    if (loading) {
        return <HubPageSkeleton/>
    }

    return (
        <div>
            <PageHeader>
                <HubNavigation hubid={params.hubid}/>
                <AddModule />
            </PageHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="row-span-1 md:row-span-3"><EnvironmentModule name={'Środowisko'}/></div>
                <div className="row-span-1"><LightModule name={'First Light'}/></div>
                <div className="row-span-1"><FanModule name={'Fan in'}/></div>
                <div className="row-span-1"><FanModule name={'Fan out'}/></div>
            </div>
        </div>
    );
}

const HubPageSkeleton: React.FC = () => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="row-span-1 md:row-span-3"><EnvironmentModuleSkeleton/></div>
                <div className="row-span-1"><LightModuleSkeleton/></div>
                <div className="row-span-1"><FanModuleSkeleton/></div>
                <div className="row-span-1"><FanModuleSkeleton/></div>
            </div>
        </div>
    )
}

export default HubPage;