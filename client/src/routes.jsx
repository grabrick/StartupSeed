import { Route, Routes } from "react-router-dom";
import React from "react";
import MainPages from "./Pages/MainPages/MainPage";
import "./App.css";
import ModifiedMainPage from "./Pages/AuthMainPage/AuthMainPage";
import MainProfile from "./Pages/MainProfile/MainProfile";

function useRoutes(isAuthticated) {
  if (isAuthticated) {
    return (
      <div className="container">
        <Routes>
          <Route path="/" element={<ModifiedMainPage />} />
          <Route path="/profile" element={<MainProfile />} />
        </Routes>
      </div>
    );
  }
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<MainPages />} />
      </Routes>
    </div>
  );
}

export default useRoutes;
