export type ErrCallbackType = (
    err: string
) => void

export type CallbackType = (
    success: boolean,
    message: string | null
) => void

export type RegisterParams = {
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
}

export type LoginParams = {
    username: string
    password: string
    rememberMe?: boolean
}

export type UserDataType = {
    username: string
    email: string
    firstName: string
    lastLame: string
    avatar?: string | null
    createdAt: string
    updatedAt: string
    verified: boolean
}

export type AuthValuesType = {
    login: (params: LoginParams, callback?: CallbackType) => void
    logout: () => void
    fetchUser: (callback?: CallbackType) => void
    getToken: () => string | null
    getUser: () => UserDataType | null
    getLastUsername: () => string | null
}