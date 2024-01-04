"use client"
import {useTheme} from "next-themes"
import React from 'react';
import {Line, LineChart, ResponsiveContainer, Tooltip} from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {themes} from "@/config/themes";
import {BatteryFullIcon, DropletsIcon, RefreshCwIcon, ThermometerIcon} from "lucide-react";
import {CircleIcon} from "@radix-ui/react-icons";
import {Separator} from "@/components/ui/separator";
import ModuleTitle from "@/app/app/hub/[hubid]/components/module/title";
import {Skeleton} from "@/components/ui/skeleton";

const data = Array.from({length: 15}, () => ({
    temperature: Math.floor(Math.random() * (23 - 18 + 1)) + 18,
    humidity: Math.floor(Math.random() * (40 - 30 + 1)) + 75,
    dirt: Math.floor(Math.random() * (33 - 30 + 1)) + 46,
}));

interface Props {
    name: string
}

const EnvironmentModule: React.FC<Props> = ({name}: Props) => {

    const {theme: mode} = useTheme()
    const theme = themes.find((theme) => theme.name === 'zinc')

    return (
        <Card className={'w-full h-full'}>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="hidden items-center justify-center w-16 h-16 rounded-md md:flex">
                                <ThermometerIcon strokeWidth="0.75" className="w-14 h-14"/>
                            </div>
                            <div className="flex flex-col justify-items-stretch">
                                <ModuleTitle>{name}</ModuleTitle>
                                <div className="flex space-x-4 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                        <CircleIcon className="mr-1 h-3 w-3 fill-green-400 text-green-400"/>
                                        Online
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flexjustify-center">
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <div>
                                    <p className="text-[0.60rem] md:text-sm uppercase text-muted-foreground">Hum.</p>
                                    <p className="text-sm md:text-2xl font-bold">86%</p>
                                </div>
                                <Separator orientation="vertical" className="h-8"/>
                                <div>
                                    <p className="text-[0.60rem] md:text-sm uppercase text-muted-foreground">Dirt</p>
                                    <p className="text-sm md:text-2xl font-bold">33%</p>
                                </div>
                                <Separator orientation="vertical" className="h-8"/>
                                <div>
                                    <p className="text-[0.60rem] md:text-sm uppercase text-muted-foreground">Temp.</p>
                                    <p className="text-sm md:text-2xl font-bold">23°C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="hidden md:block">
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 10,
                                left: 10,
                                bottom: 0,
                            }}
                        >
                            <Tooltip
                                content={({active, payload}) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Hum.
                                </span>
                                                        <span className="font-bold">
                                  {payload[1].value}%
                                </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Dirt
                                </span>
                                                        <span className="font-bold">
                                  {payload[2].value}%
                                </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Temp.
                                </span>
                                                        <span className="font-bold text-muted-foreground">
                                    {payload[0].value} °C
                                </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    return null
                                }}
                            />
                            <Line
                                type="monotone"
                                strokeWidth={2}
                                dataKey="temperature"
                                activeDot={{
                                    r: 6,
                                    style: {fill: "var(--theme-primary)", opacity: 0.25},
                                }}
                                style={
                                    {
                                        stroke: "var(--theme-primary)",
                                        opacity: 0.25,
                                        "--theme-primary": `hsl(${
                                            theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                                        })`,
                                    } as React.CSSProperties
                                }
                            />
                            <Line
                                type="monotone"
                                strokeWidth={2}
                                dataKey="dirt"
                                activeDot={{
                                    r: 6,
                                    style: {fill: "var(--theme-primary)", opacity: 0.45},
                                }}
                                style={
                                    {
                                        stroke: "var(--theme-primary)",
                                        opacity: 0.45,
                                        "--theme-primary": `hsl(${
                                            theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                                        })`,
                                    } as React.CSSProperties
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="humidity"
                                strokeWidth={2}
                                activeDot={{
                                    r: 8,
                                    style: {fill: "var(--theme-primary)"},
                                }}
                                style={
                                    {
                                        stroke: "var(--theme-primary)",
                                        "--theme-primary": `hsl(${
                                            theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                                        })`,
                                    } as React.CSSProperties
                                }
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

const EnvironmentModuleSkeleton: React.FC = () => {
    return (
        <Card className={'w-full h-full items-center'}>
            <div className="flex w-full justify-between p-5">
                <div className="flex items-center space-x-2">
                    <div className="hidden items-center justify-center rounded-md md:flex">
                        <Skeleton className="h-16 w-16"/>
                    </div>
                    <div className="flex flex-col justify-items-stretch">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-3">
                            <Skeleton className="h-8 w-36"/>
                        </h3>
                        <div className="flex space-x-4 text-sm text-muted-foreground">
                            <Skeleton className="h-4 w-16"/>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Skeleton className="h-10 w-20 md:w-36"/>
                </div>
            </div>
            <div className={'px-5 pb-5 hidden md:block'}>
                <Skeleton className="h-80 w-full"/>
            </div>
        </Card>
    )
}

export { EnvironmentModule, EnvironmentModuleSkeleton }