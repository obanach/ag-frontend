import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {wait} from "next/dist/lib/wait";
import {useAutoGrowApi} from "@/hooks/useAutoGrowApi";
import {Icons} from "@/components/icons";
import {toast} from "@/components/ui/use-toast";
import {HubType} from "@/app/app/type";


interface Props {
    onHubCreated?: (hub: HubType) => void
}

const CreateNewHub: React.FC<Props> = ({onHubCreated}: Props) => {

    const ag = useAutoGrowApi();
    const [createModal, setCreateModal] = useState<boolean>(false)
    const [pairingModal, setPairingModal] = useState<boolean>(false)

    const [hubName, setHubName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);

    const [hub, setHub] = useState<HubType | null>(null);

    const openModal = () => {
        setError('');
        setHubName('');
        setCreateModal(true);
    }

    const handleCancel = () => {
        setCreateModal(false);
    }

    const checkPairingStatus = () => {
        ag.makeGet('/app/hub/' + hub?.id, [], (response) => {
            if (response.pairCode === null) {
                setPairingModal(false);
                toast({
                    description: 'Hub ' + response.name + ' paired successfully!'
                })
                if (onHubCreated) {
                    onHubCreated(response);
                }
                setHub(response);
            }
        }, (error) => {
            setPairingModal(false);
            toast({
                variant: 'destructive',
                description: error
            })
        })
    }

    React.useEffect(() => {
        if (hub && hub.pairCode) {
            const interval = setInterval(() => {
                checkPairingStatus();
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [hub]);

    const handleContinue = () => {
        setLoading(true);
        if (hubName.length < 1) {
            setError('Please enter a hub name');
            return;
        }
        ag.makePost('/app/hub/', {name: hubName}, (response) => {
            setLoading(false);
            setHub(response)
            setCreateModal(false);
            wait(500).then(() => {
                setPairingModal(true);
            });
        }, (error) => {
            setLoading(false);
            setCreateModal(false);
            toast({
                variant: 'destructive',
                description: error
            })
        })
    }

    return (
        <>
            <Button variant={'outline'} onClick={openModal}>Add new</Button>
            <AlertDialog open={createModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={'text-center'}>Add new hub</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p className="leading-7 mt-3 mb-3 text-center">Enter a name for your new hub to continue</p>
                            {error && (
                                <Alert variant="destructive" className={'mb-3'}>
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <Input
                                type="text"
                                placeholder="Hub name"
                                value={hubName}
                                onChange={(event) => setHubName(event.target.value)}
                                autoCorrect={'off'}
                                autoCapitalize={'off'}
                                autoComplete={'off'}
                                className={'mb-3'}
                            />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className={'gap-3 md:gap-0'}>
                        <Button variant={'outline'} onClick={handleCancel} disabled={loading}>Cancel</Button>
                        <Button variant={'default'} onClick={handleContinue} disabled={loading}>
                            {loading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Continue
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
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

export default CreateNewHub;