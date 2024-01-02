"use client";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";

export default function App() {

    const router = useRouter();
    const auth = useAuth();
    const user = auth.getUser();

  return (
      <div>
          App <br/>
          {user?.username} <br/>
          {user?.email} <br/>
            {user?.firstName} <br/>
            {user?.lastName} <br/>
            {user?.avatar} <br/>
            {(new Date(user?.createdAt ?? '')).toLocaleDateString(navigator.language || 'en-US', { day: 'numeric', month: 'short', year: 'numeric'})} <br/>
          <button onClick={() => router.push('/auth/logout')}>Logout</button>

      </div>
  )
}
