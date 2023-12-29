"use client";
import {ReactNode} from "react";
import {useAuth} from "@/hooks/useAuth";
import {Spinner} from "@/components/spinner";
interface props {
    children: ReactNode
}

function AppLayout({ children}: props) {

    const auth = useAuth()
    auth.checkLogin()

    if(auth.loading) {
        return <Spinner />
    }

    return (
        <section>
            <div className="relative flex min-h-screen flex-col">
                <div className="container relative mt-5">
                    Tutaj bedzie header
                    {children}
                </div>
            </div>
        </section>
    )
}

export default AppLayout;