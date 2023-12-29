
import { Icons } from "./icons";

export function Spinner() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Icons.spinner className="h-10 w-10 animate-spin" />
        </div>
    )
}