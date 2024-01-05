"use client";
import {ReactNode} from "react";
import {PageHeaderHeading} from "@/components/page-header";
import HubNavigation from "@/app/app/hub/[hubid]/components/navigation";

interface props {
    children: ReactNode,
    params: { hubid: number }
}

function HubLayout({children, params}: props) {

    //TODO: Check if hub exists and get hub name

    return (
        <section>
            <div className={'pb-5'}>
                <PageHeaderHeading>
                    My first Hub
                </PageHeaderHeading>
            </div>
            <HubNavigation hubid={params.hubid} classname={'pb-5'}/>
            <div>
                {children}
            </div>
        </section>
    )
}

export default HubLayout;