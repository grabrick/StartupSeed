import "./App.css";
import useRoutes from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import React from "react";

function App() {
  const {token, login, logout, userID, admin} = useAuth()
  const isAuthenticated = !!token
  const isAdmin = !!admin
  const routes = useRoutes(isAuthenticated, isAdmin)

  return (
    <AuthContext.Provider value={{
      token, login, logout, userID, isAuthenticated, isAdmin
    }}>
      <>
        { routes }
      </>
    </AuthContext.Provider>
  );
}

export default App;
