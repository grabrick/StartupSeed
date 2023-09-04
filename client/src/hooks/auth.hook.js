import axios from "axios";
import { useState, useCallback, useEffect } from "react";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userID, setUserID] = useState(null)
    const [admin, isAdmin] = useState(false)

    const login = useCallback((jwtToken, id, admin) => {
        setToken(jwtToken)
        setUserID(id)
        isAdmin(admin)

        axios.get(`/api/auth/${id}/get`).then(res => {
            if(res.data.isAdmin) {
                localStorage.setItem(storageName, JSON.stringify({
                    userID: id,
                    token: jwtToken,
                    isAdmin: res.data.isAdmin ? res.data.isAdmin : false,
                }));
            }
        })

        localStorage.setItem(storageName, JSON.stringify({
            userID: id,
            token: jwtToken,
            isAdmin:  false,
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserID(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem(storageName))

            if (data && data.token) {
                login(data.token, data.userID, data.isAdmin)
            }
        } catch (error) {
            localStorage.removeItem(storageName);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { login, logout, token, userID, admin }
}