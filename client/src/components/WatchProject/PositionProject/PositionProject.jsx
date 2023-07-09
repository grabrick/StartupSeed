import { useDispatch, useSelector } from "react-redux";
import m from "./PositionProject.module.css";
import { addFavorites } from "../../../redux/slices/currentProject";
import axios from "axios";
import { useState } from "react";

function PositionProject({ item, projectId }) {
  const stock = `${m.wrapper}`;
  const isActive = `${m.activeWrapper}`;
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.currentProject.isFavorite);
  const projectData = useSelector(
    (state) => state.currentProject.currentProject
  );
  const findPost = projectData.projectPost.find((items) => items);
  const [value, setValue] = useState({
    projectID: projectId,
    projectName: projectData.projectName,
    jobPost: findPost.jobPost,
    postLevel: findPost.postLevel,
    profilePic: projectData?.projectImage,
    isFavorite: favorites,
  });

  const upload = (updatedFavorites) => {
    axios
      .post(`/api/${userId}/addProjectFavorites`, { ...value })
      .then((response) => {
        if (response.status === 200) {
          dispatch(addFavorites(updatedFavorites));
        }
      });
  };

  const removeFavorite = (updatedFavorites) => {
    axios
    .delete(`/api/${userId}/removeFavorites`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(addFavorites(updatedFavorites));
      }
    });
  };

  const toggler = () => {
    if (favorites === false) {
      const updatedFavorites = !favorites;
      upload(updatedFavorites);
    } else {
      const updatedFavorites = !favorites;
      removeFavorite(updatedFavorites);
    }
  };

  return (
    <div className={m.container}>
      <div className={favorites ? isActive : stock}>
        <h2 className={m.postTitle}>
          {item?.jobPost},{" "}
          <span className={m.postLevel}>{item?.postLevel}</span>
        </h2>
        <p className={m.postDesc}>{item?.jobTask}</p>
        <div className={m.buttonWrapper}>
          <button className={m.addFavorite} onClick={() => toggler()}>
            {favorites ? "Убрать из избранного" : "Добавить в избранное"}
          </button>
          <button className={m.addMessage}>Откликнуться</button>
        </div>
      </div>
    </div>
  );
}

export default PositionProject;
