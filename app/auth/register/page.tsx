"use client";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import React, {useEffect} from "react";
import {Spinner} from "@/components/spinner";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";

function RegisterPage() {
    const router = useRouter();
    const auth = useAuth();

    const [loading, setLoading] = React.useState<boolean>(true)
    const [logging, setLogging] = React.useState<boolean>(false)

    const [username, setUsername] = React.useState<string>('')
    const [firstName, setFirstName] = React.useState<string>('')
    const [lastName, setLastName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [repeatPassword, setRepeatPassword] = React.useState<string>('')
    const [terms, setTerms] = React.useState<boolean>(false)

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

        if (!terms) {
            setError('You must accept the Terms of Service and Privacy Policy.')
            return
        }

        if (password !== repeatPassword) {
            setError('Passwords do not match.')
            return
        }

        setLogging(true)
        auth.register({username, firstName, lastName, email, password}, (success, message) =>{
            if (success) {
                router.push('/auth/account-created');
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
                    Register
                </h1>
                <p className="text-sm text-muted-foreground">
                    Fill in the form below to create an account.
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
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <Label className="sr-only" htmlFor="firstname">
                                    First Name
                                </Label>
                                <Input
                                    id="firstname"
                                    placeholder="First Name"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="firstname"
                                    autoCorrect="off"
                                    disabled={logging}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <Label className="sr-only" htmlFor="lastname">
                                    Last Name
                                </Label>
                                <Input
                                    id="lastname"
                                    placeholder="Last Name"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="lastname"
                                    autoCorrect="off"
                                    disabled={logging}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
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
                            <Label className="sr-only" htmlFor="email">
                                E-mail
                            </Label>
                            <Input
                                id="email"
                                placeholder="Email"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={logging}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="password">
                                Repeat Password
                            </Label>
                            <Input
                                id="password"
                                placeholder="Repeat password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="password"
                                autoCorrect="off"
                                disabled={logging}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-1 my-4">
                            <div className="flex items-center space-x-3">
                                <Checkbox id="rememberme"
                                          disabled={logging}
                                          checked={terms}
                                          onCheckedChange={() => setTerms(!terms)}/>
                                <label
                                    htmlFor="rememberme"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I accept the Terms of Service and Privacy Policy.
                                </label>
                            </div>
                        </div>

                        <Button disabled={logging}>
                            {logging && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Register
                        </Button>

                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Already have an account?
                      </span>
                    </div>
                </div>
                <Button variant="outline" type="button" disabled={logging} onClick={() => {
                    router.push('/auth/login')
                }}>
                    Log in
                </Button>
            </div>
        </section>
    );
}

export default RegisterPage;