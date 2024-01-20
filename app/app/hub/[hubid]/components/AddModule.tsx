"use client";
import {Button} from "@/components/ui/button";
import React, {useEffect, useRef, useState} from "react";
import {useAutoGrowApi} from "@/hooks/useAutoGrowApi";
import {Icons} from "@/components/icons";
import {ModuleType} from "@/app/app/type";
import {Plus, RadioTower, ThermometerIcon, ToggleLeft, Trash} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Card} from "@/components/ui/card";
import {userMqttClient} from "@/hooks/userMqttClient";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Skeleton} from "@/components/ui/skeleton";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";
import {wait} from "next/dist/lib/wait";


interface Props {
    onModulePaired?: () => void
}

interface PairModuleType {
    type: 'environment' | 'switch',
    macAddress: string,
    name?: string
}

const AddModule: React.FC<Props> = ({onModulePaired}: Props) => {

    const mqttClient = userMqttClient();
    const ag = useAutoGrowApi();

    const [modules, setModules] = useState<PairModuleType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [pairing, setPairing] = useState<boolean>(false);
    const [moduleToPair, setModuleToPair] = useState<PairModuleType | null>(null);

    const pairingRef = useRef(pairing);

    useEffect(() => {
        pairingRef.current = pairing;
    }, [pairing]);

    useEffect(() => {

        mqttClient.onMessage('/module/discover', (data) => {

            if (!data.modules) {
                console.warn('MQTT: Invalid discover response');
            }

            const modules = data.modules.map((module: any) => {
                return {
                    type: module.type,
                    macAddress: module.macAddress
                }
            })
            setModules(modules);
            setLoading(false);
        });

        mqttClient.onMessage('/module/pair', (data) => {

            if (!data.paired || !data.id || !data.macAddress) {
                console.warn('MQTT: Invalid discover response');
            }

            if (data.paired === false) {
                onPairingError('Pairing failed');
                return;
            }

            if (data.paired === true) {
                onPairingSuccess();
                return;
            }

        });

    }, []);


    const pairModule = () => {
        if (pairing || !moduleToPair) {
            return;
        }

        if (!moduleToPair.name) {
            toast({
                variant: 'destructive',
                description: 'Please name your module before pairing.'
            })
            return;
        }

        setPairing(true);
        mqttClient.sendMessage('/module/pair', {
            macAddress: moduleToPair.macAddress,
            name: moduleToPair.name
        });

        setTimeout(() => {onPairingError('Pairing timed out');}, 30000); // 10 seconds
    }

    const onPairingSuccess = () => {
        setOpen(false);
        wait(300).then(() => {
            setLoading(false);
            setPairing(false);
            setModuleToPair(null);
            setModules([]);
            if (onModulePaired) {
                onModulePaired();
            }
        });
    }

    const onPairingError = (error: string) => {
        if (!pairingRef.current) {
            return;
        }
        setPairing(false);
        setModuleToPair(null);
        toast({
            variant: 'destructive',
            description: error
        })
    }


    const requestModules = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        mqttClient.sendMessage('/module/discover', {});
    }

    const openModal = () => {
        setOpen(true);
        requestModules();
    }

    return (
        <>
            <Button variant={'outline'} onClick={openModal}><Plus className={'w-4 h-4 mr-2'}/>Add module</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new module</DialogTitle>
                        <DialogDescription>
                            Pick module that you want to add to your hub. Make sure that your module is in pairing mode.
                        </DialogDescription>
                    </DialogHeader>
                    <div className={'flex flex-col h-56 overflow-y-auto justify-center gap-3'}>
                        {moduleToPair ? (
                            <ModulePairView module={moduleToPair} onModuleChange={(module) => {setModuleToPair(module)}} pairing={pairing}/>
                        ) : (
                            loading ? (
                                    modules.length === 0 ? (
                                        <ModuleListLoading />
                                    ) : (
                                        modules.map((module) => <ModuleListItem key={module.macAddress} module={module} onAdd={(module) => {setModuleToPair(module)}} />)
                                    )
                                ) : (
                                    modules.length === 0 ? (
                                        <Alert variant={'destructive'}>
                                            <RadioTower className="h-4 w-4" />
                                            <AlertTitle>No modules found</AlertTitle>
                                            <AlertDescription>
                                                Make sure that your module is on and in pairing mode. Click refresh to try again.
                                            </AlertDescription>
                                        </Alert>
                                    ) : (
                                        modules.map((module) => <ModuleListItem key={module.macAddress} module={module} onAdd={(module) => {setModuleToPair(module)}} />)
                                    )
                                )
                        )}
                    </div>
                    <DialogFooter>
                        {moduleToPair ? (
                            <>
                                <Button variant={'destructive'} onClick={() => setModuleToPair(null)} disabled={pairing}>Cancel</Button>
                                <Button variant={'default'} onClick={pairModule} disabled={pairing}>
                                    {pairing && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                                    )}
                                    Pair
                                </Button>
                            </>
                            ) : (
                            <Button variant={'default'} disabled={loading} onClick={requestModules}>
                                {loading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                                )}
                                Refresh
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );

}

interface ModulePairViewProps {
    module: PairModuleType
    pairing: boolean
    onModuleChange?: (module: PairModuleType) => void
}

const ModulePairView: React.FC<ModulePairViewProps> = ({module, pairing, onModuleChange}) => {

    const icon = module.type === 'environment' ? <ThermometerIcon className="h-11 w-11"/> : <ToggleLeft className="h-11 w-11"/>;
    const name = module.type === 'environment' ? 'environment' : 'switch';

    const handleChange = (name: string) => {
        if(onModuleChange){
            onModuleChange({...module, name: name});
        }
    }

    return (
        <div className={`flex flex-col items-center`}>
            <div
                className='flex items-center justify-center border rounded-full h-20 w-20 mb-10'>
                {icon}
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name your new {name} module</Label>
                <Input type="name" id="name" placeholder={`ie. ${name}`} value={module.name} onChange={(event) => handleChange(event.target.value)} disabled={pairing} />
            </div>
        </div>
    )
}


interface ModuleListItemProps {
    module: PairModuleType
    onAdd?: (module: PairModuleType) => void
}

const ModuleListItem: React.FC<ModuleListItemProps> = ({module, onAdd}) => {

    if (module.type !== 'environment' && module.type !== 'switch') {
        return null;
    }

    const icon = module.type === 'environment' ? <ThermometerIcon className="h-5 w-5"/> : <ToggleLeft className="h-5 w-5"/>;
    const name = module.type === 'environment' ? 'Environment' : 'Switch';

    return (
        <Card className={'flex flex-row items-center justify-between p-3 w-full'}>
            <div className={'flex flex-row items-center gap-3'}>
                <div
                    className='flex items-center justify-center border rounded-full h-9 w-9'>
                    {icon}
                </div>
                <p>{name}</p>
            </div>
            <Button variant="outline" size="icon" onClick={() => {
                if (onAdd) {
                    onAdd(module);
                }
            }}>
                <Plus className="h-4 w-4"/>
            </Button>
        </Card>
    )
}

const ModuleListLoading: React.FC = () => {
    return (
        <>
            <Card className={'flex flex-row items-center justify-between p-3 w-full'}>
                <div className={'flex flex-row items-center gap-3'}>
                    <Skeleton className={'w-9 h-9'}/>
                    <Skeleton className={'w-56 h-5'}/>
                </div>
                <Skeleton className={'w-10 h-10'}/>
            </Card>
            <Card className={'flex flex-row items-center justify-between p-3 w-full'}>
                <div className={'flex flex-row items-center gap-3'}>
                    <Skeleton className={'w-9 h-9'}/>
                    <Skeleton className={'w-56 h-5'}/>
                </div>
                <Skeleton className={'w-10 h-10'}/>
            </Card>
            <Card className={'flex flex-row items-center justify-between p-3 w-full'}>
                <div className={'flex flex-row items-center gap-3'}>
                    <Skeleton className={'w-9 h-9'}/>
                    <Skeleton className={'w-56 h-5'}/>
                </div>
                <Skeleton className={'w-10 h-10'}/>
            </Card>
        </>
    )
}

export default AddModule;