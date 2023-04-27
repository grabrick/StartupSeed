import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import MainPages from "./Pages/MainPages/MainPage";
import "./App.css";
import ModifiedMainPage from "./Pages/AuthMainPage/AuthMainPage";
import MainProfile from "./Pages/MainProfile/MainProfile";
import EditPages from "./Pages/EditPages/EditPages";

function useRoutes(isAuthticated) {
  if (isAuthticated) {
    return (
      <div className="container">
        <Routes>
          <Route path="/home" element={<ModifiedMainPage />} />
          <Route path="/profile" element={<MainProfile />} />
          <Route path="/edit" element={<EditPages />} />

          {/* --------- Redirect------- */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Routes>
          {/* --------- Redirect------- */}
          <Route path="/edit" element={<Navigate to="/" replace />} />
          <Route path="/" element={<MainPages />} />
        </Routes>
      </div>
    );
  }
}

export default useRoutes;
