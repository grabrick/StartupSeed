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
import MainSpecialistsPage from "./Pages/MainSpecialistsPage/MainSpecialistsPage";
import MainProjectEdit from "./Pages/MainProjectEdit/MainProjectEdit";
import WatchSpecialistPage from "./Pages/WatchSpecialistPage/WatchSpecialistPage";
import WatchProjectPage from "./Pages/WatchProjectPage/WatchProjectPage";
import MainFavorite from "./Pages/MainFavorite/MainFavorite";
import AdminMainPage from "./Pages/Admin/AdminMainPage/AdminMainPage";

function useRoutes(isAuthticated, isAdmin) {
  if (isAuthticated) {
    return (
      <div className="container">
        <Routes>
          {isAdmin && (
            <Route path="/admin/control" element={<AdminMainPage isAdmin={isAdmin} />} />
          )}
          <Route path="/home" element={<ModifiedMainPage isAdmin={isAdmin} />} />
          <Route path="/favorites" element={<MainFavorite isAdmin={isAdmin} />} />
          <Route path="/project" element={<MainFindProject isAdmin={isAdmin} />} />
          <Route path="/project/:id" element={<WatchProjectPage isAdmin={isAdmin} />} />
          <Route path="/profile" element={<MainProfile isAdmin={isAdmin} />} />
          <Route path="/specialists" element={<MainSpecialistsPage isAdmin={isAdmin} />} />
          <Route path="/specialist/:id" element={<WatchSpecialistPage isAdmin={isAdmin} />} />
          <Route path="/profile/edit" element={<EditPages isAdmin={isAdmin} />} />
          <Route path="/profile/project" element={<MainProject isAdmin={isAdmin} />} />
          <Route path="/profile/project/:id/edit" element={<MainProjectEdit isAdmin={isAdmin} />} />
          <Route path="/profile/create" element={<MainCreateProject isAdmin={isAdmin} />} />
          <Route path="/profile/settings" element={<MainSettings isAdmin={isAdmin} />} />

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
