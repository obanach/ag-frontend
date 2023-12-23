export type ErrCallbackType = (err: { [key: string]: string }) => void

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
    token: string | null
    loading: boolean
    logout: () => void
    user: UserDataType | null
    login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}