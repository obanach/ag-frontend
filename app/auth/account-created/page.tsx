"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Checkbox} from "@/components/ui/checkbox";
import {useAuth} from "@/hooks/useAuth";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Spinner} from "@/components/spinner";
import {Icons} from "@/components/icons";

function AccountCreatedPage() {
    const router = useRouter();
    const auth = useAuth();

    const [loading, setLoading] = React.useState<boolean>(true)
    const [logging, setLogging] = React.useState<boolean>(false)
    const [username, setUsername] = React.useState<string>(auth.getLastUsername() || '')
    const [password, setPassword] = React.useState<string>('')

    const [rememberMe, setRememberMe] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>('')


    useEffect(() => {
        if (auth.getUser()) {
            router.push('/app')
            return
        }
        setLoading(false)
    }, [])

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setLogging(true)

        auth.login({username, password, rememberMe}, (success, message) =>{
            if (success) {
                router.push('/app');
            }
            if (message) {
                setError(message)
            }
            setLogging(false)
        })
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <section>
            <div className="flex flex-col space-y-2 text-center mb-5">
                <Icons.tick className={'w-32 h-32 mx-auto mb-5'}/>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Account created
                </h1>
                <p className="text-sm text-muted-foreground">
                    Your account has been successfully created. You can now log in.
                </p>
            </div>
            <div className={'grid'}>
                <Button variant="outline" type="button" disabled={logging} onClick={() => {
                    router.push('/auth/login')
                }}>
                    Go to login page
                </Button>
            </div>
        </section>
    );
}

export default AccountCreatedPage;