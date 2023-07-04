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
  const [value, setValue] = useState({
    projectID: projectId,
    isFavorite: favorites,
  });

  const upload = () => {
    const updatedFavorites = !favorites; // Инвертировать текущее значение
    dispatch(addFavorites(updatedFavorites));
    axios.put(`/api/${userId}/addProjectFavorites`, { ...value, isFavorite: updatedFavorites });
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
          <button className={m.addFavorite} onClick={() => upload()}>
            {favorites ? "Убрать из избранного" : "Добавить в избранное"}
          </button>
          <button className={m.addMessage}>Откликнуться</button>
        </div>
      </div>
    </div>
  );
}

export default PositionProject;
