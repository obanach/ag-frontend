import {CircleIcon} from "@radix-ui/react-icons"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch";
import * as React from "react";
import {BatteryFullIcon, FanIcon, LightbulbIcon, RefreshCwIcon, Thermometer, ThermometerIcon} from "lucide-react";

export function AirTemperature() {
  return (
    <Card>
      <div className="flex items-center justify-between p-5">
          <div className="flex items-center space-x-2">
            <div className="hidden items-center justify-center w-20 h-20 rounded-md md:flex">
              <ThermometerIcon strokeWidth="0.75" className="w-16 h-16" />
            </div>
            <div className="flex flex-col justify-items-stretch">
              <h3 className="text-2xl font-semibold leading-none tracking-tight mb-3">Air temperature</h3>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CircleIcon className="mr-1 h-3 w-3 fill-green-400 text-green-400" />
                    Online
                  </div>
                  <div className="flex items-center">
                    <BatteryFullIcon className="mr-1 h-3 w-3" />
                    25%
                  </div>
                  <div className="flex items-center">
                    <RefreshCwIcon className="mr-1 h-3 w-3" />
                    now
                  </div>
                </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <h2 className="text-3xl font-semibold leading-none tracking-tight">23°C</h2>
          </div>
        </div>
    </Card>
  )
}