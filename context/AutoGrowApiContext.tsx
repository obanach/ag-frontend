"use client";
import {createContext, ReactNode} from "react";
import {
    ApiErrorCallbackType, ApiSuccessCallbackType,
    AuthValuesType,
    AutogrowApiType,
    CallbackType,
    LoginParams,
    RegisterParams,
    UserDataType
} from "@/context/types";
import {authConfig} from "@/config/auth";
import axios from "axios";
import {useAuth} from "@/hooks/useAuth";


const defaultProvider: AutogrowApiType = {
    makeGet: () => Promise.resolve(),
    makePost: () => Promise.resolve(),
    makePut: () => Promise.resolve(),
    makeDelete: () => Promise.resolve(),
}

const AutoGrowApiContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const AutoGrowApiProvider = ({ children }: Props) => {

    const auth = useAuth()


    async function handleGet(url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) {
        await axios
            .get( authConfig.domain + url, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                },
                params: params
            })
            .then(async response => {
                if (response.status !== 200) {
                    if (error) {
                        if (response.data.message) {
                            error(response.data.message)
                        } else {
                            error('Error while fetching data.')
                        }
                    }
                }

                if (success) {
                    success(response.data)
                }
            })
            .catch(() => {
                if (error) {
                    error('Server error while fetching data.')
                }
            })
    }

    async function handlePost(url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) {
        axios
            .post(authConfig.domain + url, params, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                }
            })
            .then(async response => {
                if (response.status !== 200) {
                    if (error) {
                        if (response.data.message) {
                            error(response.data.message)
                        } else {
                            error('Error while creating data.')
                        }
                    }
                }

                if (success) {
                    success(response.data)
                }
            })
            .catch(() => {
                if (error) {
                    error('Server error while creating data.')
                }
            })
    }
    async function handlePut(url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) {
        axios
            .put(authConfig.domain + url, params, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                }
            })
            .then(async response => {
                if (response.status !== 200) {
                    if (error) {
                        if (response.data.message) {
                            error(response.data.message)
                        } else {
                            error('Error while updating data.')
                        }
                    }
                }

                if (success) {
                    success(response.data)
                }
            })
            .catch(() => {
                if (error) {
                    error('Server error while updating data.')
                }
            })
    }

    async function handleDelete(url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) {
        await axios
            .delete( authConfig.domain + url, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                },
                params: params
            })
            .then(async response => {
                if (response.status !== 200) {
                    if (error) {
                        if (response.data.message) {
                            error(response.data.message)
                        } else {
                            error('Error while fetching data.')
                        }
                    }
                }

                if (success) {
                    success(response.data)
                }
            })
            .catch(() => {
                if (error) {
                    error('Server error while fetching data.')
                }
            })
    }


    const values = {
        makeGet: handleGet,
        makePost: handlePost,
        makePut: handlePut,
        makeDelete: handleDelete
    }

    return <AutoGrowApiContext.Provider value={values}>{children}</AutoGrowApiContext.Provider>
}


export { AutoGrowApiContext, AutoGrowApiProvider }