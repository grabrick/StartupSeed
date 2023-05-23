import "./App.css";
import useRoutes from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import React from "react";

function App() {
  const {token, login, logout, userID} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    
    <AuthContext.Provider value={{
      token, login, logout, userID, isAuthenticated
    }}>
      <div className="App">
        { routes }
      </div>
    </AuthContext.Provider>
  );
}

export default App;
