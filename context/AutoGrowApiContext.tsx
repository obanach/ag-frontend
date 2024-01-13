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
import {useRouter} from "next/navigation";


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

    const auth = useAuth();
    const router = useRouter();


    async function handleRequest(method: 'get' | 'post' | 'put' | 'delete', url: string, params: object = {}, success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) {
        await axios[method](authConfig.domain + url, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            },
            params: method === 'get' || method === 'delete' ? params : undefined,
            data: method === 'post' || method === 'put' ? params : undefined
        })
            .then(async response => {
                if (success) {
                    success(response.data)
                }
            })
            .catch((reason) => {
                let message = 'Server error while fetching data.'

                if (reason.response.status === 400) {
                    message = reason.response.data.message;
                }

                if (reason.response.status === 401) {
                    auth.logout()
                    router.push('/auth/login')
                }

                if (reason.response.status === 403) {
                    message = 'You are not authorized to access this resource.'
                }

                if (error) {
                    error(message)
                }
            })
    }

    const values = {
        makeGet: (url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) => handleRequest('get', url, params, success, error),
        makePost: (url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) => handleRequest('post', url, params, success, error),
        makePut: (url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) => handleRequest('put', url, params, success, error),
        makeDelete: (url: string, params: [], success?: ApiSuccessCallbackType, error?: ApiErrorCallbackType) => handleRequest('delete', url, params, success, error),
    }

    return <AutoGrowApiContext.Provider value={values}>{children}</AutoGrowApiContext.Provider>
}


export { AutoGrowApiContext, AutoGrowApiProvider }