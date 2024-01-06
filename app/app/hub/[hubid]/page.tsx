"use client";
import {FanModule, FanModuleSkeleton} from "@/app/app/hub/[hubid]/components/module/fan";
import {LightModule, LightModuleSkeleton} from "@/app/app/hub/[hubid]/components/module/light";
import {EnvironmentModule, EnvironmentModuleSkeleton} from "@/app/app/hub/[hubid]/components/module/environment";
import React, {useEffect, useState} from "react";

function HubPage() {
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