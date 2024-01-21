"use client"
import {useTheme} from "next-themes"
import React, {useEffect} from 'react';
import {Line, LineChart, ResponsiveContainer, Tooltip, YAxis} from "recharts"
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {themes} from "@/config/themes";
import {BatteryFullIcon, ThermometerIcon} from "lucide-react";
import {CircleIcon} from "@radix-ui/react-icons";
import {Separator} from "@/components/ui/separator";
import ModuleTitle from "@/app/app/hub/[hubid]/components/module/title";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import DeleteModule from "@/app/app/hub/[hubid]/components/module/Delete";

interface Props {
    hubId: number,
    moduleId: number,
    name: string,
    data: any[]
}

const EnvironmentModule: React.FC<Props> = ({hubId, moduleId, name , data}: Props) => {

    const {theme: mode} = useTheme()
    const theme = themes.find((theme) => theme.name === 'zinc')
    const [humidity, setHumidity] = React.useState<number>(0)
    const [dirt, setDirt] = React.useState<number>(0)
    const [temperature, setTemperature] = React.useState<number>(0)
    const [battery, setBattery] = React.useState<number>(0)

    data = data.map((item) => {
        return {
            ...item,
            createdAt: new Date(item.createdAt).toLocaleString(navigator.language, {
                day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
            })
        }
    })

    useEffect(() => {
        if (data.length > 0) {
            setHumidity(data[data.length - 1].humidity)
            setDirt(Math.round(data[data.length - 1].dirt));
            setTemperature(data[data.length - 1].temperature)
            setBattery(Math.round(data[data.length - 1].battery));
        }
    }, [data])



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
                                    <div className="flex items-center">
                                        <BatteryFullIcon className="mr-1 h-3 w-3"/>
                                        {battery}%
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flexjustify-center">
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <div>
                                    <p className="text-[0.60rem] md:text-sm uppercase text-muted-foreground">Hum.</p>
                                    <p className="text-sm md:text-2xl font-bold">{humidity}%</p>
                                </div>
                                <Separator orientation="vertical" className="h-8"/>
                                <div>
                                    <p className="text-[0.60rem] md:text-sm uppercase text-muted-foreground">Dirt</p>
                                    <p className="text-sm md:text-2xl font-bold">{dirt}%</p>
                                </div>
                                <Separator orientation="vertical" className="h-8"/>
                                <div>
                                    <p className="text-[0.60rem] md:text-sm uppercase text-muted-foreground">Temp.</p>
                                    <p className="text-sm md:text-2xl font-bold">{temperature}°C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="hidden md:block pb-5">
                <div className="h-80">
                    {(data.length === 0) ? (
                        <div className={'flex items-center justify-center h-full'}><p className={'text-muted-foreground'}>No data received yet.</p></div>) : (
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
                                <YAxis domain={[0, 100]} hide={true} dataKey="temperature"/>
                                <Tooltip
                                    content={({active, payload}) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <div className="flex flex-col">
                                                        <span
                                                            className="text-[0.70rem] uppercase text-muted-foreground">
                                                          Hum.
                                                        </span>
                                                            <span className="font-bold text-muted-foreground">
                                                          {payload[2].value}%
                                                        </span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                              Dirt
                                                            </span>
                                                            <span className="font-bold text-muted-foreground">
                                                              {payload[1].value}%
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                        <span
                                                            className="text-[0.70rem] uppercase text-muted-foreground">
                                                          Temp.
                                                        </span>
                                                            <span className="font-bold text-muted-foreground">
                                                            {payload[0].value} °C
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <p className={'text-[0.70rem] text-muted-foreground mt-2 text-center'}>{payload[0].payload.createdAt}</p>
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
                                            opacity: 0.20,
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
                                            opacity: 0.55,
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
                        </ResponsiveContainer>)}

                </div>
            </CardContent>
            <div className={'px-5 pb-5 flex justify-end'}>
                <DeleteModule hubId={hubId} moduleId={moduleId} name={name} />
            </div>
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

export {EnvironmentModule, EnvironmentModuleSkeleton}