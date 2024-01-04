"use client";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import CreateNewHub from "@/app/app/components/CreateNewHub";

export default function App() {

    const router = useRouter();
    const auth = useAuth();
    const user = auth.getUser();

    return (
        <div className={''}>


            <div className={'mb-5 flex items-center'}>
                <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] mr-auto">
                    List of hubs
                </h2>

                <CreateNewHub />

            </div>

            <Button asChild>
                <Link href={'/app/hub/example'}>Example hub</Link>
            </Button>


        </div>
    );
}
