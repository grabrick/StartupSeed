import { useDispatch, useSelector } from "react-redux";
import m from "./PositionProject.module.css";
import {
  addFavoritesProject,
  getFavorite,
  removeProjectFavorite,
} from "../../../redux/slices/currentProjectSlice";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PositionProject({ item, projectId, post, projectOwner }) {
  const stock = `${m.wrapper}`;
  const isActive = `${m.activeWrapper}`;
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projectData = useSelector(
    (state) => state.currentProject.currentProject
  );
  const favoriteProject = useSelector(
    (state) => state.currentProject.favoritesProject
  );
  const findCurrentFavorites = favoriteProject.find(
    (i) => i.postID === item.id
  );
  const findPost = projectData.projectPost.find((items) => items.id === item.id);
  const currentID = post.projectPost.find((i) => i.id === item.id);
  const findID = favoriteProject.find(i => i.postID === currentID.id)

  const [value] = useState({
    postID: item.id,
    projectID: projectId,
    projectName: projectData.projectName,
    jobPost: findPost.jobPost,
    postLevel: findPost.postLevel,
    profilePic: projectData?.projectImage,
    isFavorite: true,
  });

  const getFavoriteProject = (items) => {
    dispatch(getFavorite(items));
  };

  const upload = () => {
    axios
      .post(`/api/${userId}/addProjectFavorites`, { ...value })
      .then((response) => {
        if (response.status === 200) {
          dispatch(addFavoritesProject({ value }));
          axios.get(`/api/${userId}/getFavorite`).then((items) => {
            getFavoriteProject(items.data.favorites.project)
          });
        }
      });
  };

  const removeFavorite = () => {
    axios
      .put(`/api/${userId}/removeFavorites`, { ...value })
      .then((response) => {
        if (response.status === 200) {
          dispatch(removeProjectFavorite({ postID: value.postID }));
        }
      });
  };

  const sendMessage = () => {
    // axios.post(`/api/${userId}/createMessage`, { projectOwner: projectOwner })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       navigate('/messenger')
    //     }
    //   })
  };

  const toggler = () => {
    if (!findID) {
      upload();
    } else if(findID) {
      removeFavorite();
    }
  };

  return (
    <div className={m.container}>
      <div
        className={item.id === findCurrentFavorites?.postID ? isActive : stock}
      >
        <h2 className={m.postTitle}>
          {item?.jobPost},{" "}
          <span className={m.postLevel}>{item?.postLevel}</span>
        </h2>
        <p className={m.postDesc}>{item?.jobTask}</p>
        <div className={m.buttonWrapper}>
          <button className={m.addFavorite} onClick={() => toggler()}>
            {item.id === findCurrentFavorites?.postID
              ? "Убрать из избранного"
              : "Добавить в избранное"}
          </button>
          <button className={m.addMessage} onClick={() => sendMessage()}>Откликнуться</button>
        </div>
      </div>
    </div>
  );
}

export default PositionProject;
