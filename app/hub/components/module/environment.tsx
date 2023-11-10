"use client"
import { useTheme } from "next-themes"
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
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

const data = Array.from({length: 15}, () => ({
  temperature: Math.floor(Math.random() * (23 - 18 + 1)) + 18,
  humidity: Math.floor(Math.random() * (40 - 30 + 1)) + 75,
}));

export function Environment() {

  const { theme: mode } = useTheme()
  const theme = themes.find((theme) => theme.name === 'zinc')

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="hidden items-center justify-center w-16 h-16 rounded-md md:flex">
              <ThermometerIcon strokeWidth="0.75" className="w-14 h-14" />
            </div>
            <div className="flex flex-col justify-items-stretch">
              <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">Environment</h3>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CircleIcon className="mr-1 h-3 w-3 fill-green-400 text-green-400" />
                    Online
                  </div>
                  <div className="flex items-center">
                    <BatteryFullIcon className="mr-1 h-3 w-3" />
                    25%
                  </div>
                </div>
            </div>
          </div>
          <div className="flexjustify-center">
            <div className="flex items-center space-x-4 text-md">
            <div>
                <p className="text-[0.70rem] uppercase text-muted-foreground">Temp.</p>
                <p className="font-bold">23°C</p>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div>
                <p className="text-[0.70rem] uppercase text-muted-foreground">Hum.</p>
                <p className="font-bold">86%</p>
            </div>
          </div>
          </div>
        </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-5">
        <div className="h-[300px]">
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
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value} °C
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Humidity
                            </span>
                            <span className="font-bold">
                              {payload[1].value}%
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
                  style: { fill: "var(--theme-primary)", opacity: 0.25 },
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
                dataKey="humidity"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)" },
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