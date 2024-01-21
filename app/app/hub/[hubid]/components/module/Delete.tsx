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
import {useAutoGrowApi} from "@/hooks/useAutoGrowApi";
import {Icons} from "@/components/icons";
import {toast} from "@/components/ui/use-toast";
import {Trash} from "lucide-react";
import {HubType} from "@/app/app/type";

interface Props {
    hubId: number
    moduleId: number
    name: string
    onModuleDeleted?: () => void
}

const DeleteModule: React.FC<Props> = ({hubId, moduleId, name, onModuleDeleted}: Props) => {

    const ag = useAutoGrowApi();
    const [createModal, setCreateModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);

    const openModal = () => {
        setCreateModal(true);
    }

    const handleCancel = () => {
        setCreateModal(false);
    }
    const handleContinue = () => {
        setLoading(true);

        ag.makeDelete('/app/hub/' + hubId + '/module/' + moduleId, {}, (response) => {
            setLoading(false);
            toast({
                description: 'Module ' + name + ' deleted!'
            })
            setCreateModal(false);
            onModuleDeleted && onModuleDeleted();
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
            <Button variant="destructive" size="icon" onClick={openModal}>
                {loading ? (
                    <Icons.spinner className="h-4 w-4 animate-spin"/>
                ) : (
                    <Trash className="h-4 w-4"/>
                )}

            </Button>
            <AlertDialog open={createModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete hub</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p className="leading-7">
                                Are you sure you want to delete module <strong>{name}</strong>?
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant={'outline'} onClick={handleCancel} disabled={loading}>Cancel</Button>
                        <Button variant={'destructive'} onClick={handleContinue} disabled={loading}>
                            {loading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );

}

export default DeleteModule;