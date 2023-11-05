import {PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/components/page-header";
import Link from "next/link";
import {Separator} from "@radix-ui/react-menu";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {siteConfig} from "@/config/site";
import {FanSwitch} from "@/app/hub/components/fan-switch";
import {LightSwitch} from "@/app/hub/components/light-switch";
import {AirTemperature} from "@/app/hub/components/air-temperature";
import {AirHumidity} from "@/app/hub/components/air-humidity";

function HubPage() {
    return (
        <div>
            <PageHeader className="pb-8">
                <PageHeaderHeading>My first Hub</PageHeaderHeading>
                <PageHeaderDescription>
                  View, configure and manage your hub and its modules remotely.
                </PageHeaderDescription>
            </PageHeader>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 col-span-2">
                <div className="col-span-1 row-span-2">
                  <FanSwitch />
                </div>
                <div className="col-span-1 row-span-2">
                  <LightSwitch />
                </div>
                <div className="col-span-1 row-span-2">
                  <AirTemperature />
                </div>
                <div className="col-span-1 row-span-2">
                  <AirHumidity />
                </div>
              </div>
        </div>
    );
}

export default HubPage;