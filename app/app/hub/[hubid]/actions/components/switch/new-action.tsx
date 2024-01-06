import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {ActionType} from "@/app/app/hub/[hubid]/actions/type";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Alert} from "@/components/ui/alert";

interface Props {
    onNewAction?: (action: ActionType) => void
}

const NewActionDialog: React.FC<Props> = ({onNewAction}: Props) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const [name, setName] = React.useState<string>('');
    const [time, setTime] = React.useState<string>('');
    const [state, setState] = React.useState<string | undefined>(undefined);


    const handleNewAction = () => {

        if (!name) {
            setError('Name is required');
            return;
        }

        if (!time) {
            setError('Time is required');
            return;
        }

        const timeRegex = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$');
        if (!timeRegex.test(time)) {
            setError('Time is not valid. Valid format is HH:MM');
            return;
        }

        if (!state) {
            setError('State is required');
            return;
        }


        const newAction = {
            id: 0,
            name: name,
            moduleName: '',
            state: state === '1',
            time: timeToSeconds(time),
            active: true
        }

        if (onNewAction) {
            onNewAction(newAction);
        }
        setOpen(false);
    }

    const handleOpen = () => {
        setError(null);
        setTime('');
        setName('');
        setState(undefined);
        setOpen(true);
    }

    const handleOpenChange = (state: boolean) => {
        setOpen(state);
    }
    return (
        <>
            <Button variant={'outline'} onClick={handleOpen}>Add new</Button>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new action</DialogTitle>
                        <DialogDescription>
                            Set what should happen when the condition is met.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                        {error && <Alert variant={'destructive'}>{error}</Alert>}
                        <div className="grid grid-cols-2 gap-4 my-3">
                            <div className="grid col-span-2 gap-2">
                                <Label htmlFor="name">Name of new action</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    placeholder="Example acton name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="time">If time is equal to:</Label>
                                <Input
                                    type="text"
                                    id="time"
                                    placeholder="12:30"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="state">Set state to:</Label>
                                <Select onValueChange={(e) => setState(e)} defaultValue={state}>
                                    <SelectTrigger id="state">
                                        <SelectValue placeholder="Select"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">OFF</SelectItem>
                                        <SelectItem value="1">ON</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button variant={'outline'} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant={'default'} onClick={handleNewAction}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

const timeToSeconds = (time: string) => {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 3600 + parseInt(minutes) * 60;
}

export default NewActionDialog;