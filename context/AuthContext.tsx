"use client";
import { useRouter } from 'next/navigation'
import {createContext, ReactNode, useState} from "react";
import {AuthValuesType, ErrCallbackType, LoginParams, UserDataType} from "@/context/types";
import {authConfig} from "@/config/auth";
import axios from "axios";


const defaultProvider: AuthValuesType = {
    user: null,
    loading: true,
    token: null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkLogin: () => Promise.resolve(),
    fetchUser: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
    const router = useRouter()
    const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
    const [token, setToken] = useState<string | null>(defaultProvider.token)
    const [loading, setLoading] = useState<boolean>(defaultProvider.loading)


    async function handleCheckLogin() {
        const token = window.localStorage.getItem(authConfig.cookies.token)
        setLoading(true);
        if (token) {
            setToken(token);
            await handleFetchUser()
        } else {
            handleLogout();
        }
        setLoading(false);
    }

    async function handleLogin(params: LoginParams, errorCallback?: ErrCallbackType) {
        axios
            .post(authConfig.endpoint.login, params)
            .then(async response => {
                params.rememberMe ? window.localStorage.setItem(authConfig.cookies.username, params.username) : window.localStorage.removeItem(authConfig.cookies.username)
                window.localStorage.setItem(authConfig.cookies.token, response.data.token)
                await handleFetchUser()
                await router.push('/app')
            })
            .catch(err => {
                if (errorCallback) errorCallback(err)
            })
    }

    async function handleFetchUser() {
        const token = window.localStorage.getItem(authConfig.cookies.token)
        await axios
            .get( authConfig.endpoint.user, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(async response => {
                if (response.status !== 200) {
                    handleLogout();
                    return;
                }
                setUser({ ...response.data })
                setToken(token);
            })
            .catch(() => {
                handleLogout();
            })
    }

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        window.localStorage.removeItem(authConfig.cookies.token);
        router.push('/auth/login');
    }

    const values = {
        user,
        token,
        loading,
        login: handleLogin,
        logout: handleLogout,
        fetchUser: handleFetchUser,
        checkLogin: handleCheckLogin
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}


export { AuthContext, AuthProvider }