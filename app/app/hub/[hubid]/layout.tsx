"use client";
import React, {ReactNode, useEffect, useState} from "react";
import {PageHeader, PageHeaderHeading} from "@/components/page-header";
import HubNavigation from "@/app/app/hub/[hubid]/components/navigation";
import {useAutoGrowApi} from "@/hooks/useAutoGrowApi";
import {HubType} from "@/app/app/type";
import {notFound, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import DeleteHub from "@/app/app/components/DeleteHub";
import {MqttClientProvider} from "@/context/MqttClientContext";
import {Badge} from "@/components/ui/badge";

interface props {
    children: ReactNode,
    params: { hubid: number }
}

function HubLayout({children, params}: props) {

    const ag = useAutoGrowApi();
    const router = useRouter();
    const [hub, setHub] = useState<HubType | null>(null);

    useEffect(() => {
        ag.makeGet('/app/hub/' + params.hubid, [], (response) => {
            if (response.pairCode !== null) {
                return router.push('/404');
            }
            setHub(response);
        }, (error) => {
            return router.push('/404');
        })
    }, []);

    if (hub) {
        return (
            <section>
                <MqttClientProvider hubId={hub.id} mqttCredentials={hub.mqtt}>
                    <PageHeader>
                        <div className={'flex items-center gap-3'}>
                            <PageHeaderHeading>
                                <span className={'text-muted'}>#</span>{hub.name}
                            </PageHeaderHeading>
                            <Badge variant={'outline'} className={'md:mt-2'}>Connected</Badge>
                        </div>
                        <DeleteHub hub={hub}/>
                    </PageHeader>
                    <div>
                        {children}
                    </div>
                </MqttClientProvider>
            </section>
        )
    }
}

export default HubLayout;