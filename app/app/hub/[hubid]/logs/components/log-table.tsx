"use client"
import {ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import * as React from "react";
import {Card} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

function LogTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

function LogTableSkeleton() {
    return (
        <div>
            <div className="mb-5 w-full flex items-center justify-end hidden">
                <Skeleton className="h-8 w-36 mr-3"/>
                <Skeleton className="h-8 w-56"/>
            </div>
            <Card className={'p-5'}>
                <Skeleton className="h-8 w-full mb-3"/>
                <Skeleton className="h-8 w-full mb-3"/>
                <Skeleton className="h-8 w-full mb-3"/>
                <Skeleton className="h-8 w-full mb-3"/>
                <Skeleton className="h-8 w-full mb-3"/>
                <Skeleton className="h-8 w-full mb-3"/>
                <Skeleton className="h-8 w-full mb-3"/>
                <Skeleton className="h-8 w-full"/>
            </Card>
            <div className="mt-5 w-full flex items-center justify-end">
                <Skeleton className="h-8 w-40"/>
            </div>
        </div>
    )
}

export {LogTable, LogTableSkeleton};