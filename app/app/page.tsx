"use client";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function App() {

    const router = useRouter();
    const auth = useAuth();
    const user = auth.getUser();

    return (
        <div className={''}>


            <div className={'my-5 flex items-stretch'}>
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mr-auto">
                    List of hubs
                </h2>

                <Button variant={'outline'}>Add new</Button>

            </div>

            <Button asChild>
                <Link href={'/app/hub'}>Example hub</Link>
            </Button>


        </div>
    );
}
