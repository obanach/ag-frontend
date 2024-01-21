"use client";
import React, {ReactNode, useEffect} from "react";
import {useAuth} from "@/hooks/useAuth";
import {Spinner} from "@/components/spinner";
import {useRouter} from "next/navigation";
import {AppHeader} from "@/components/app-header";
import {AutoGrowApiProvider} from "@/context/AutoGrowApiContext";

interface props {
    children: ReactNode
}

function AppLayout({children}: props) {
    const router = useRouter()
    const auth = useAuth()
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const year = new Date().getFullYear();

    useEffect(() => {
        auth.fetchUser((status) => {
            if (status) {
                setIsLoading(false)
            } else {
                router.push('/auth/login');
            }
        })
    })

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <div className="container flex flex-col min-h-screen bg-background">
            <AppHeader/>
            <div className={'h-full'}>
                <AutoGrowApiProvider>
                    {children}
                </AutoGrowApiProvider>
            </div>
            <div className="mt-auto p-10">
                <div className="text-center text-sm text-gray-500">
                    © {year} AutoGrow. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default AppLayout;