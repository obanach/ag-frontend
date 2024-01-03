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


function CreateNewHub() {

    const [createModal, setCreateModal] = useState<boolean>(false)
    const [codeModal, setCodeModal] = useState<boolean>(false)
    const [hubName, setHubName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const openModal = () => {
        setError('');
        setHubName('');
        setCreateModal(true);
    }

    const handleCancel = () => {
        setCreateModal(false);
    }
    const handleContinue = () => {
        if (hubName.length < 1) {
            setError('Please enter a hub name');
            return;
        }
        setCreateModal(false);
        wait(500).then(() => {
            setCodeModal(true);
        });
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
                        <Button variant={'outline'} onClick={handleCancel}>Cancel</Button>
                        <Button variant={'default'} onClick={handleContinue}>Continue</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={codeModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={'text-center'}>Pair</AlertDialogTitle>
                        <AlertDialogDescription>
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-[.25em] lg:text-5xl text-center my-5">
                                123123
                            </h1>
                            <p className={'text-sm text-muted-foreground text-center mb-5'}>
                                Enter this code in your hub to pair it with this account.
                            </p>
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