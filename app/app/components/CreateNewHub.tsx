import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {wait} from "next/dist/lib/wait";
import {useAutoGrowApi} from "@/hooks/useAutoGrowApi";
import {Icons} from "@/components/icons";
import {toast} from "@/components/ui/use-toast";


function CreateNewHub() {

    const ag = useAutoGrowApi();

    const [createModal, setCreateModal] = useState<boolean>(false)
    const [codeModal, setCodeModal] = useState<boolean>(false)
    const [hubName, setHubName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [pairCode, setPairCode] = useState<number>(0);

    const openModal = () => {
        setError('');
        setHubName('');
        setCreateModal(true);
    }

    const handleCancel = () => {
        setCreateModal(false);
    }
    const handleContinue = () => {
        setLoading(true);
        if (hubName.length < 1) {
            setError('Please enter a hub name');
            return;
        }

        ag.makePost('/app/hub/', {name: hubName}, (response) => {
            setLoading(false);
            setCreateModal(false);
            setPairCode(response.pairCode);
            wait(500).then(() => {
                setCodeModal(true);
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

    const handleClose = () => {
        setCodeModal(false);
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
                    <AlertDialogFooter>
                        <Button variant={'outline'} onClick={handleCancel} disabled={loading}>Cancel</Button>
                        <Button variant={'default'} onClick={handleContinue} disabled={loading}>
                            {loading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Continue
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={codeModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={'text-center'}>Paring...</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="text-4xl font-extrabold text-primary tracking-[.25em] lg:text-5xl text-center my-5">
                                {pairCode}
                            </div>
                            <div className={'text-sm text-muted-foreground text-center mb-5'}>
                                Enter this code in your hub to pair it with this account.
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant={'default'} className={'w-full'} onClick={handleClose}>Close</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );

}

export default CreateNewHub;