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
    hub: HubType
    onHubDeleted?: (hub: HubType) => void
}

const DeleteHub: React.FC<Props> = ({hub, onHubDeleted}: Props) => {

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

        ag.makeDelete('/app/hub/' + hub.id, {}, (response) => {
            setLoading(false);
            if (onHubDeleted) {
                onHubDeleted(hub);
            }
            toast({
                description: 'Hub ' + hub.name + ' deleted!'
            })
            setCreateModal(false);
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
                <Trash className="h-4 w-4"/>
            </Button>
            <AlertDialog open={createModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete hub</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p className="leading-7">
                                Are you sure you want to delete hub <strong>{hub.name}</strong>?
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

export default DeleteHub;