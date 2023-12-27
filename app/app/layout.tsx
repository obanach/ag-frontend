import {ReactNode} from "react";
interface props {
    children: ReactNode
}

function AppLayout({ children}: props) {
    return (
        <section>
            <div className="relative flex min-h-screen flex-col">
                <div className="container relative mt-5">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default AppLayout;