import {ReactNode} from "react";
import Image from "next/image"
import Link from "next/link"
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
interface props {
    children: ReactNode
}

function AuthLayout({ children}: props) {
    return (
        <section className={'h-screen'}>
            <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <Link href={'/'}>
                        <div className="relative z-20 flex items-center text-lg font-medium">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-6 w-6"
                            >
                                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                            </svg>
                            AutoGrow
                        </div>
                    </Link>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthLayout;