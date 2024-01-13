interface HubType {
    id: number,
    name: string,
    modulesCount: number,
    pairCode: number | null,
    pingAt: Date | null,
    createdAt: Date,
    updatedAt: Date | null
}

export type { HubType }