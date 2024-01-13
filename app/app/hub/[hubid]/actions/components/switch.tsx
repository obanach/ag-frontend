import * as React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Action, ActionEmpty, ActionSkeleton} from "@/app/app/hub/[hubid]/actions/components/switch/action";
import {useToast} from "@/components/ui/use-toast";
import {Skeleton} from "@/components/ui/skeleton";
import NewActionDialog from "@/app/app/hub/[hubid]/actions/components/switch/new-action";
import {ActionType} from "@/app/app/hub/[hubid]/actions/type";

interface Props {
    name: string
}

const actionsData = [
    {
        id: 1,
        name: 'Turn light on',
        moduleName: 'Fan in',
        state: true,
        time: 7200,
        active: true
    },
    {
        id: 2,
        name: 'Turn light off',
        moduleName: 'Fan in',
        state: false,
        time: 43200,
        active: false
    }
]

const SwitchAction: React.FC<Props> = ({name}: Props) => {
    const {toast} = useToast();
    const [actions, setActions] = React.useState(actionsData);

    const handleNewAction = (action: ActionType) => {

        const newAction = {
            ...action,
            id: Math.floor(Math.random() * 1000) + 1,
            moduleName: name
        }

        setActions([...actions, newAction]);
        toast({
            description: 'New action "' + newAction.name + '" has been added',
        })
    }

    const onActionActiveChange = (id: number) => {
        const newActions = actions.map((action) => {
            if (action.id === id) {
                return {
                    ...action,
                    active: !action.active
                }
            }
            return action;
        });
        setActions(newActions);
        toast({
            description: 'Action "' + newActions.find((action) => action.id === id)?.name + '" has been ' + (newActions.find((action) => action.id === id)?.active ? 'activated' : 'deactivated'),

        })
    }

    const onActionDelete = (id: number) => {
        const action = actions.find((action) => action.id === id);
        const newActions = actions.filter((action) => action.id !== id);
        setActions(newActions);
        toast({
            description: 'Action "' + action?.name + '" has been deleted',
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>You can set up to 5 actions that will happen on your module at certain
                    time</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {
                    actions.length === 0
                        ? <ActionEmpty/>
                        : actions.map((action) => (
                            <Action
                                key={action.id}
                                id={action.id}
                                name={action.name}
                                moduleName={action.moduleName}
                                state={action.state}
                                time={action.time}
                                onDelete={onActionDelete}
                            />
                        ))
                }
            </CardContent>
            <CardFooter className="flex justify-end">
                <NewActionDialog onNewAction={handleNewAction}/>
            </CardFooter>
        </Card>
    )
}

const SwitchActionSkeleton: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle><Skeleton className="h-8 w-36"/></CardTitle>
                <CardDescription><Skeleton className="h-5 w-72"/></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <ActionSkeleton/>
                <ActionSkeleton/>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Skeleton className="h-8 w-20"/>
            </CardFooter>
        </Card>
    )
}

export {SwitchAction, SwitchActionSkeleton};