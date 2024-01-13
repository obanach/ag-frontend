export type ErrCallbackType = (
    err: string
) => void

export type CallbackType = (
    success: boolean,
    message: string | null
) => void

export type ApiSuccessCallbackType = (data: any) => void

export type ApiErrorCallbackType = (message: string) => void

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
    lastName: string
    avatar?: string | null
    createdAt: string
    verified: boolean
}

export type AuthValuesType = {
    login: (params: LoginParams, callback?: CallbackType) => void
    register: (params: RegisterParams, callback?: CallbackType) => void
    logout: () => void
    fetchUser: (callback?: CallbackType) => void
    getToken: () => string | null
    getUser: () => UserDataType | null
    getLastUsername: () => string | null
}

export type AutogrowApiType = {
    makeGet: (url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) => void
    makePost: (url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) => void
    makePut: (url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) => void
    makeDelete: (url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) => void
}