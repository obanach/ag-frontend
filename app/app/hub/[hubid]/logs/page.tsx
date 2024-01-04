"use client";

import {ColumnDef} from "@tanstack/react-table";
import {LogTable, LogTableSkeleton} from "@/app/app/hub/[hubid]/logs/components/log-table";
import {Badge} from "@/components/ui/badge";
import {useEffect, useState} from "react";

type LogType = {
    id: number
    device: string
    type: number
    message: string
    date: Date
}
const columns: ColumnDef<LogType>[] = [
    {
        accessorKey: "device",
        header: () => <div className="text-left">Device</div>,
        cell: ({ row }) => {
            return (<div className="text-left font-medium">{row.getValue("device")}</div>)
        },
    },
    {
        accessorKey: "type",
        header: () => <div className="text-left">Type</div>,
        cell: ({ row }) => {
            const type = row.getValue("type");
            switch (type) {
                case 0:
                    return (<Badge variant="outline">Info</Badge>)
                case 1:
                    return (<Badge variant="outline">Success</Badge>)
                case 2:
                    return (<Badge>Warning</Badge>)
                case 3:
                    return (<Badge variant="destructive">Error</Badge>)
            }
        },
    },
    {
        accessorKey: "message",
        header: "Message",
    },
    {
        accessorKey: "date",
        header: () => <div className="text-right">Date</div>,
        cell: ({ row }) => {
            const formattedDate = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'medium', timeStyle: 'medium' }).format(row.getValue('date'));

            return (<div className="text-right font-medium">{formattedDate}</div>)
        },

    },
]

const data: LogType[] = [
    {
        id: 1,
        device: "Fan in",
        type: 0,
        message: "Fan in turned on",
        date: new Date(),
    },
    {
        id: 2,
        device: "Fan out",
        type: 1,
        message: "Fan out turned on",
        date: new Date(),
    },
    {
        id: 3,
        device: "Hub",
        type: 2,
        message: "Low wifi signal",
        date: new Date(),
    },
    {
        id: 4,
        device: "Hub",
        type: 3,
        message: "Low battery",
        date: new Date(),
    }
];

function HubLogsPage() {

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, []);

    if (loading) {
        return <LogTableSkeleton />
    }

    return (
        <div>
            <LogTable columns={columns} data={data} />
        </div>
    );
}

export default HubLogsPage;