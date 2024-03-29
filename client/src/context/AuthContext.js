import {createContext} from "react";

function noop () {}

export const AuthContext = createContext({
    token: null,
    userID: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    admin: false
})