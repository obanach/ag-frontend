import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useAutoGrowApi} from "@/hooks/useAutoGrowApi";
import {toast} from "@/components/ui/use-toast";
import {RefreshCw} from "lucide-react";
import {HubType} from "@/app/app/type";

interface Props {
    hub: HubType
    onHubUpdated?: (hub: HubType) => void
}

const RefreshHub: React.FC<Props> = ({hub, onHubUpdated}: Props) => {

    const ag = useAutoGrowApi();
    const [loading, setLoading] = useState<boolean>(false);

    const handleRefresh = () => {
        setLoading(true);
        ag.makeGet('/app/hub/' + hub.id, {}, (response) => {
            setLoading(false);
            if (onHubUpdated) {
                onHubUpdated(response);
            }
            toast({
                description: 'Hub ' + hub.name + ' refreshed!'
            })
        }, (error) => {
            setLoading(false);
            toast({
                variant: 'destructive',
                description: error
            })
        })
    }

    return (
        <>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}/>
            </Button>
        </>
    );

}

export default RefreshHub;