"use client";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import {useRouter} from "next/navigation";
import {Checkbox} from "@/components/ui/checkbox";

function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [rememberMe, setRememberMe] = React.useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
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
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="username">
                                Username
                            </Label>
                            <Input
                                id="username"
                                placeholder="username"
                                type="text"
                                autoCapitalize="none"
                                autoComplete="username"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                placeholder="password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="password"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-1 my-2">
                            <div className="flex items-center space-x-3">
                                <Checkbox id="rememberme" />
                                <label
                                    htmlFor="rememberme"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <Button disabled={isLoading}>
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
                <Button variant="outline" type="button" disabled={isLoading} onClick={() => {
                    router.push('/auth/register')
                }}>
                    Create an account
                </Button>
            </div>
        </section>
    );
}

export default LoginPage;