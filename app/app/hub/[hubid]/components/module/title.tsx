import * as React from "react";


interface Props {
    children: React.ReactNode
}

const ModuleTitle: React.FC<Props> = ({children}: Props) => {
    return (
        <h3 className="text-xl md:text-2xl font-semibold leading-none tracking-tight mb-2">{children}</h3>
    )

}

export default ModuleTitle;