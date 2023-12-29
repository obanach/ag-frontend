"use client";
import {useAuth} from "@/hooks/useAuth";
import {Spinner} from "@/components/spinner";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

function LogoutPage() {

    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        auth.logout();
        router.push('/auth/login');
    })

    return <Spinner/>;
}

export default LogoutPage;