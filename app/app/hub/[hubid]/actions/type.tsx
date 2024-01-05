interface ActionType {
    id: number,
    name: string,
    moduleName: string,
    state: boolean,
    time: number,
    active: boolean
}

export type { ActionType }