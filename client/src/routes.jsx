import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import MainPages from "./Pages/MainPages/MainPage";
import "./App.css";
import ModifiedMainPage from "./Pages/AuthMainPage/AuthMainPage";
import MainProfile from "./Pages/MainProfile/MainProfile";
import EditPages from "./Pages/EditPages/EditPages";
import MainSettings from "./Pages/MainSettings/MainSettings";
import MainProject from "./Pages/MainProject/MainProject";
import MainCreateProject from "./Pages/MainCreateProject/MainCreateProject";
import MainFindProject from "./Pages/MainFindProject/MainFindProject";
import HomeSpecialists from "./Pages/HomeSpecialists/HomeSpecialists";
import MainProjectEdit from "./Pages/MainProjectEdit/MainProjectEdit";
import MainMessenger from "./Pages/MainMessenger/MainMessenger";
import WatchSpecialistPage from "./Pages/WatchSpecialistPage/WatchSpecialistPage";

function useRoutes(isAuthticated) {
  if (isAuthticated) {
    return (
      <div className="container">
        <Routes>
          <Route path="/home" element={<ModifiedMainPage />} />
          <Route path="/project" element={<MainFindProject />} />
          <Route path="/profile" element={<MainProfile />} />
          <Route path="/specialists" element={<HomeSpecialists />} />
          <Route path="/specialist/:id" element={<WatchSpecialistPage />} />
          <Route path="/messenger" element={<MainMessenger />} />
          <Route path="/profile/edit" element={<EditPages />} />
          <Route path="/profile/project" element={<MainProject />} />
          <Route path="/profile/project/:id/edit" element={<MainProjectEdit />} />
          <Route path="/profile/create" element={<MainCreateProject />} />
          <Route path="/profile/settings" element={<MainSettings />} />


          {/* --------- Redirect------- */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/main" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Routes>
          {/* --------- Redirect------- */}
          {/* <Route path="/profile" element={<Navigate to="/main" replace />} /> */}
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<MainPages />} />
        </Routes>
      </div>
    );
  }
}

export default useRoutes;
