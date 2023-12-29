"use client";
import {createContext, ReactNode} from "react";
import {AuthValuesType, CallbackType, LoginParams, UserDataType} from "@/context/types";
import {authConfig} from "@/config/auth";
import axios from "axios";


const defaultProvider: AuthValuesType = {
    getToken: () => null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    fetchUser: () => Promise.resolve(),
    getUser: () => null,
    getLastUsername: () => null
}

const AuthContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const AuthProvider = ({ children }: Props) => {

    const getUser = () => {
        const userData = window.localStorage.getItem(authConfig.cookies.user);
        return userData ? JSON.parse(userData) : null;
    };
    const setUserInStorage = (user: UserDataType) => window.localStorage.setItem(authConfig.cookies.user, JSON.stringify(user));
    const removeUserFromStorage = () => window.localStorage.removeItem(authConfig.cookies.user);

    const getLastUsername = () => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem(authConfig.cookies.username) || '';
        }
        return '';
    }
    const setLastUsernameInStorage = (username: string) => window.localStorage.setItem(authConfig.cookies.username, username);
    const removeLastUsernameFromStorage = () => window.localStorage.removeItem(authConfig.cookies.username);

    const getToken = () => window.localStorage.getItem(authConfig.cookies.token);
    const setTokenInStorage = (token: string) => window.localStorage.setItem(authConfig.cookies.token, token);
    const removeTokenFromStorage = () => window.localStorage.removeItem(authConfig.cookies.token);

    async function handleLogin(params: LoginParams, callback?: CallbackType) {
        axios
            .post(authConfig.endpoint.login, {
                username: params.username,
                password: params.password
            })
            .then(async response => {
                params.rememberMe ? setLastUsernameInStorage(params.username) : removeLastUsernameFromStorage();
                setTokenInStorage(response.data.token);
                await handleFetchUser();
                if (callback) {
                    callback(true, null)
                }
            })
            .catch(err => {
                if (callback) {
                    callback(false, err.response.data.message)
                }
            })
    }

    async function handleFetchUser(callback?: CallbackType) {
        await axios
            .get( authConfig.endpoint.user, {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            })
            .then(async response => {
                if (response.status !== 200) {
                    handleLogout();
                    if (callback) {
                        callback(false, response.data.message)
                    }
                }
                setUserInStorage({
                    username: response.data.username,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastLame: response.data.lastLame,
                    avatar: response.data.avatar,
                    createdAt: response.data.createdAt,
                    updatedAt: response.data.updatedAt,
                    verified: response.data.verified
                })
                if (callback) {
                    callback(true, null)
                }
            })
            .catch(() => {
                handleLogout();
                if (callback) {
                    callback(false, 'Error while fetching user.')
                }
            })
    }

    const handleLogout = () => {
        removeUserFromStorage()
        removeTokenFromStorage();
    }

    const values = {
        login: handleLogin,
        logout: handleLogout,
        fetchUser: handleFetchUser,
        getLastUsername,
        getToken,
        getUser
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}


export { AuthContext, AuthProvider }