import { useDispatch, useSelector } from "react-redux";
import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./WatchSpecialist.module.css";
import ProfileComponent from "./ProfileComponent/ProfileComponent";
import InfoComponent from "./InfoComponent/InfoComponent";
import {
  addFavoritesUser,
  removeUserFavorite,
} from "../../redux/slices/currentUser";
import axios from "axios";

function WatchSpecialist({ userID, items }) {
  const stock = `${m.specialistContainer}`;
  const isActive = `${m.activeWrapper}`;
  const dispatch = useDispatch();
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const favorites = useSelector((state) => state.currentUser.favoritesUser);
  const find = favorites.find((items) => items);
  const upload = () => {
    axios
      .post(`/api/${userId}/addUserFavorites`, {
        userID: userID,
        fname: items.fname,
        lname: items.lname,
        post: items.more?.job?.post,
        postLevel: items.more?.job?.postLevel,
        profilePic: items.more?.job?.pers?.profilePic,
        isFavorite: true,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            addFavoritesUser({
              userID: userID,
              fname: items.fname,
              lname: items.lname,
              post: items.more?.job?.post,
              postLevel: items.more?.job?.postLevel,
              profilePic: items.more?.job?.pers?.profilePic,
              isFavorite: true,
            })
          );
        }
      });
  };

  const removeFavorite = () => {
    axios
      .put(`/api/${userId}/removeUserFavorites`, {
        userID: userID,
        fname: items.fname,
        lname: items.lname,
        post: items.more?.job?.post,
        postLevel: items.more?.job?.postLevel,
        profilePic: items.more?.job?.pers?.profilePic,
        isFavorite: true,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            removeUserFavorite({
              userID: userID,
            })
          );
        }
      });
  };

  const toggler = () => {
    if (find?.isFavorite === undefined) {
      upload();
    } else {
      removeFavorite()
    }
  };

  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <ModifiedHeader />
        <div className={find?.userID === userID ? isActive : stock}>
          <div className={m.specialistWrapper}>
            <div className={m.infoWrapper}>
              <div className={m.profileWindow}>
                <ProfileComponent items={items} />
              </div>
              <div className={m.infoWindow}>
                <InfoComponent items={items} />
              </div>
            </div>
            <div className={m.buttonWrapper}>
              <button className={m.addFavorite} onClick={() => toggler()}>
                {find?.userID === userID
                  ? "Убрать из избранного"
                  : "Добавить в избранное"}
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
