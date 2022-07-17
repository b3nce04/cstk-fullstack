import {createContext, useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

import { useSnackbar } from 'notistack'

import apiClient from "../api/api-client.js";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuth, setAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true)
        apiClient("get", "/user/is-authenticated", (res) => {
			setAuth(res.authenticated)
            setLoading(false)
		});
    }, [])

    const login = () => {
        setAuth(true)
        navigate('/')
    }

    const logout = async () => {
        apiClient("get", "/user/logout", (res) => {
			setAuth(false)
            navigate('/login')
            enqueueSnackbar(res.msg, { variant: res.type || 'info' })
		});
    }

    return (<AuthContext.Provider value={{loading, login, logout, isAuth}}>
        {!loading && children}
    </AuthContext.Provider>)
}

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth}