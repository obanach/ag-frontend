import {Separator} from "@/components/ui/separator";
import {SidebarNav} from "@/app/app/user/components/sidebar-nav";
function SettingsPage() {
    return (
        <>
          <div className="block space-y-6 pb-16">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">
                Manage your account settings and set e-mail preferences.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5">
                <SidebarNav />
              </aside>
              <div className="flex-1 lg:max-w-2xl">

                  {/*TODO: Add form here*/}

              </div>
            </div>
          </div>
        </>
    );
}

export default SettingsPage;