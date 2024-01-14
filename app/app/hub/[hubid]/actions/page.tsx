"use client";

import {SwitchAction, SwitchActionSkeleton} from "@/app/app/hub/[hubid]/actions/components/switch";
import React, {useEffect, useState} from "react";
import HubNavigation from "@/app/app/hub/[hubid]/components/navigation";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {PageHeader} from "@/components/page-header";
interface props {
    params: { hubid: number }
}
function HubActionsPage({params}: props) {

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, []);

    if (loading) {
        return <SwitchActionSkeleton/>
    }

    return (
        <div>
            <PageHeader>
                <HubNavigation hubid={params.hubid}/>
            </PageHeader>
            <SwitchAction name={'Fan in'}/>
        </div>
    );
}

export default HubActionsPage;