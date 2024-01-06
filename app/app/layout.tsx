"use client";
import React, {ReactNode, useEffect} from "react";
import {useAuth} from "@/hooks/useAuth";
import {Spinner} from "@/components/spinner";
import {useRouter} from "next/navigation";
import {AppHeader} from "@/components/app-header";

interface props {
    children: ReactNode
}

function AppLayout({children}: props) {
    const router = useRouter()
    const auth = useAuth()
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

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
        <section>
            <div className="relative container flex min-h-screen flex-col">
                <AppHeader/>
                {children}
            </div>
        </section>
    )
}

export default AppLayout;