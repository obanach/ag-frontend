"use client";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {useAutoGrowApi} from "@/hooks/useAutoGrowApi";
import {Icons} from "@/components/icons";
import {HubType, ModuleType} from "@/app/app/type";
import {Plus, ThermometerIcon, ToggleLeft, Trash} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Card} from "@/components/ui/card";


interface Props {
    onModulePaired?: (module: ModuleType) => void
}

const AddModule: React.FC<Props> = ({onModulePaired}: Props) => {

    const ag = useAutoGrowApi();
    const [listModal, setListModal] = useState<boolean>(false)

    const [pairingModal, setPairingModal] = useState<boolean>(false)

    const [hubName, setHubName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);

    const [hub, setHub] = useState<HubType | null>(null);

    const openListModal = () => {
        setError('');
        setHubName('');
        setListModal(true);
    }

    const closeListModal = () => {
        setListModal(false);
    }

    return (
        <>
            <Button variant={'outline'} onClick={openListModal}><Plus className={'w-4 h-4 mr-2'}/>Add module</Button>
            <Dialog open={listModal} onOpenChange={closeListModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new module</DialogTitle>
                        <DialogDescription>
                            Pick module that you want to add to your hub. Make sure that your module is in pairing mode.
                        </DialogDescription>
                    </DialogHeader>
                    <div className={'flex flex-col min-h-36 justify-center gap-3'}>
                        <ModuleListItem type={'environment'} macAddress={'123:123:123:213'} />
                        <ModuleListItem type={'switch'} macAddress={'123:123:123:213'} />
                        <ModuleListItem type={'switch'} macAddress={'123:123:123:213'} />
                    </div>
                    <DialogFooter>
                        <Button variant={'default'}>Refresh</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>




            <AlertDialog open={pairingModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle
                            className={'text-center'}>Paring <strong>{hub?.name}</strong>...</AlertDialogTitle>
                        <AlertDialogDescription className={'flex flex-col gap-5'}>
                            <div className={'flex justify-center mt-8'}>
                                <Icons.spinner className="mr-2 h-14 w-14 animate-spin"/>
                            </div>
                            <div
                                className="text-4xl font-extrabold text-primary tracking-[.25em] lg:text-5xl text-center">
                                {hub?.pairCode}
                            </div>
                            <div className={'text-sm text-muted-foreground text-center'}>
                                Enter this code in your hub to pair it with this account.
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );

}


interface ModuleListItemProps {
    type: 'environment' | 'switch',
    macAddress: string,
    onAdd?: (macAddress: string) => void
}

const ModuleListItem: React.FC<ModuleListItemProps> = ({type, macAddress, onAdd}: ModuleListItemProps) => {

    const icon = type === 'environment' ? <ThermometerIcon className="h-5 w-5"/> : <ToggleLeft className="h-5 w-5"/>;
    const name = type === 'environment' ? 'Environment' : 'Switch';

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
                    onAdd(macAddress);
                }
            }}>
                <Plus className="h-4 w-4"/>
            </Button>
        </Card>
    )
}

export default AddModule;