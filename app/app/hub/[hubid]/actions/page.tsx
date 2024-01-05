"use client";

import {SwitchAction, SwitchActionSkeleton} from "@/app/app/hub/[hubid]/actions/components/switch";
import {useEffect, useState} from "react";

function HubActionsPage() {

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, []);

    if (loading) {
        return <SwitchActionSkeleton />
    }

    return (
        <div>
            <SwitchAction name={'Fan in'} />
        </div>
    );
}

export default HubActionsPage;