import { useDispatch, useSelector } from "react-redux";
import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./WatchSpecialist.module.css";
import ProfileComponent from "./ProfileComponent/ProfileComponent";
import InfoComponent from "./InfoComponent/InfoComponent";
import { addFavorites } from "../../redux/slices/currentUser";
import { useState } from "react";
import axios from "axios";

function WatchSpecialist({userID}) {
  const stock = `${m.specialistContainer}`;
  const isActive = `${m.activeWrapper}`;
  const dispatch = useDispatch();
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const favorites = useSelector((state) => state.currentUser.isFavorite);
  const [value, setValue] = useState({
    userID: userID,
    isFavorite: favorites,
  });

  const upload = () => {
    const updatedFavorites = !favorites; // Инвертировать текущее значение
    dispatch(addFavorites(updatedFavorites));
    axios.put(`/api/${userId}/addUserFavorites`, { ...value, isFavorite: updatedFavorites });
  };

  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <ModifiedHeader />
        <div className={favorites ? isActive : stock}>
          <div className={m.specialistWrapper}>
            <div className={m.infoWrapper}>
              <div className={m.profileWindow}>
                <ProfileComponent items={currentUser} />
              </div>
              <div className={m.infoWindow}>
                <InfoComponent items={currentUser} />
              </div>
            </div>
            <div className={m.buttonWrapper}>
              <button className={m.addFavorite} onClick={() => upload()}>
                {favorites ? "Убрать из избранного" : "Добавить в избранное"}
              </button>
              <button className={m.addMessage}>Отправить приглашение</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchSpecialist;
