"use client";

import HubNavigation from "@/app/app/hub/[hubid]/components/navigation";
import {PageHeader} from "@/components/page-header";
import React from "react";

interface props {
    params: { hubid: number }
}
function HubSettingsPage({params}: props) {

    return (
        <div>
            <PageHeader>
                <HubNavigation hubid={params.hubid}/>
            </PageHeader>
            Settings
        </div>
    );
}

export default HubSettingsPage;