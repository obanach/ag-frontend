"use client";
import {LightModule, LightModuleSkeleton} from "@/app/app/hub/[hubid]/components/module/light";
import {EnvironmentModule, EnvironmentModuleSkeleton} from "@/app/app/hub/[hubid]/components/module/environment";
import React, {ReactNode, useCallback, useEffect, useState} from "react";
import {PageHeader, PageHeaderDescription, PageSubHeaderHeading} from "@/components/page-header";
import {Button} from "@/components/ui/button";
import {Plus, RadioTower} from "lucide-react";
import HubNavigation from "@/app/app/hub/[hubid]/components/navigation";
import AddModule from "@/app/app/hub/[hubid]/components/AddModule";
import {userMqttClient} from "@/hooks/userMqttClient";
import {useAutoGrowApi} from "@/hooks/useAutoGrowApi";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {SwitchModule, SwitchModuleSkeleton} from "@/app/app/hub/[hubid]/components/module/switch";

interface props {
    params: { hubid: number }
}
function HubPage({params}: props) {
    const [loading, setLoading] = useState<boolean>(true)
    const mqttClient = userMqttClient();
    const ag = useAutoGrowApi();
    const [modules, setModules] = useState<any[]>([]);

    useEffect(() => {
        loadModules();
    }, []);


    const loadModules = () => {
        setLoading(true);
        ag.makeGet('/app/hub/' + params.hubid + '/module', [], (modules) => {
            setModules(modules);
            setLoading(false);
        }, (error) => {
            console.log(error);
            setLoading(false);
        })

    }

    const handleOnModulePaired = () => {
        console.log('Module paired');
    }

    return (
        <div>
            <PageHeader>
                <HubNavigation hubid={params.hubid}/>
                <AddModule onModulePaired={handleOnModulePaired} />
            </PageHeader>
            {
                loading ? (
                    <HubPageSkeleton/>
                ) : (

                    modules.length === 0 ? (
                        <Alert>
                            <RadioTower className="h-4 w-4" />
                            <AlertTitle>No modules paired</AlertTitle>
                            <AlertDescription>
                                You can pair new modules to your hub by clicking the button above.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {
                                modules.map((module) => {
                                    if (module.type === 'environment') {
                                        return <div className="row-span-1 md:row-span-3" key={module.id}><EnvironmentModule key={module.id} name={module.name} data={module.data} moduleId={module.id} hubId={params.hubid}/></div>
                                    }
                                    if (module.type === 'switch') {
                                        return <div className="row-span-1" key={module.id}><SwitchModule name={module.name} moduleId={module.id} hubId={params.hubid}/></div>
                                    }
                                    return null;
                                })
                            }
                        </div>
                    )
                )
            }
        </div>
    );
}

const HubPageSkeleton: React.FC = () => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="row-span-1 md:row-span-3"><EnvironmentModuleSkeleton/></div>
                <div className="row-span-1"><SwitchModuleSkeleton/></div>
                <div className="row-span-1"><SwitchModuleSkeleton/></div>
                <div className="row-span-1"><SwitchModuleSkeleton/></div>
            </div>
        </div>
    )
}

export default HubPage;