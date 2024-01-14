interface HubType {
    id: number,
    name: string,
    modulesCount: number,
    pairCode: number | null,
    pingAt: Date | null,
    createdAt: Date,
    updatedAt: Date | null
    online: boolean
}

interface ModuleType {
    id: number,
    type: 'environment' | 'switch',
    name: string,
    hubId: number,
    createdAt: Date,
    updatedAt: Date | null
}

export type { HubType, ModuleType }