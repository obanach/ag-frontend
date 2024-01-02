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

function LoginPage() {
    const router = useRouter();
    const auth = useAuth();

    const [loading, setLoading] = React.useState<boolean>(true)
    const [logging, setLogging] = React.useState<boolean>(false)
    const [username, setUsername] = React.useState<string>(auth.getLastUsername() || '')
    const [password, setPassword] = React.useState<string>('')

    const [rememberMe, setRememberMe] = React.useState<boolean>(true)
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
                <h1 className="text-2xl font-semibold tracking-tight">
                    Log in
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email and password to log in.
                </p>
            </div>
            <div className={'grid gap-6'}>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="username">
                                Username
                            </Label>
                            <Input
                                id="username"
                                placeholder="Username"
                                type="text"
                                autoCapitalize="none"
                                autoComplete="username"
                                autoCorrect="off"
                                disabled={logging}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="password"
                                autoCorrect="off"
                                disabled={logging}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-1 my-4">
                            <div className="flex items-center space-x-3">
                                <Checkbox id="rememberme"
                                          disabled={logging}
                                          checked={rememberMe}
                                          onCheckedChange={() => setRememberMe(!rememberMe)}/>
                                <label
                                    htmlFor="rememberme"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <Button disabled={logging}>
                            {logging && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Log in
                        </Button>

                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Need an account?
                      </span>
                    </div>
                </div>
                <Button variant="outline" type="button" disabled={logging} onClick={() => {
                    router.push('/auth/register')
                }}>
                    Create an account
                </Button>
            </div>
        </section>
    );
}

export default LoginPage;