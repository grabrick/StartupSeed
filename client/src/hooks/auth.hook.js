import { useState, useCallback, useEffect } from "react";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userID, setUserID] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserID(id)

        localStorage.setItem(storageName, JSON.stringify({
            userID: id,
            token: jwtToken
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
                login(data.token, data.userID)
            }
        } catch (error) {
            localStorage.removeItem(storageName);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { login, logout, token, userID }
}