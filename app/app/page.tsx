"use client";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";

export default function App() {

    const router = useRouter();
    const auth = useAuth();
    const user = auth.getUser();

  return (
      <main>
        <div className="relative flex min-h-screen flex-col">
          <div className="container relative mt-5">
                App <br/>
                {user?.username} <br/>
                {user?.email} <br/>
                <button onClick={() => router.push('/auth/logout')}>Logout</button>

          </div>
        </div>
      </main>
  )
}
