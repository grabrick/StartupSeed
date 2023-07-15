import { useState } from "react";
import m from "./WarningProjectPopup.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../../../redux/slices/userSlice";

function WarningProjectPopup({ close, postID }) {
  const [isVisible] = useState(false);
  const dispatch = useDispatch();
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const active = `${m.active}`;
  const inactive = `${m.inactive}`;

  const User = (items) => {
    dispatch(getUser(items));
  };

  const onClickDelete = () => {
    axios.put(`/api/${userId}/removeFavorites`, { postID }).then((response) => {
      if (response.status === 200) {
        axios.get(`/api/auth/${userId}/get`).then((items) => {
          User(items.data);
        });
        close(false);
      }
    });
  };

  return (
    <div className={isVisible ? inactive : active} onClick={() => close(false)}>
      <div className={m.wrapper} onClick={(e) => e.stopPropagation()}>
        <p className={m.title}>Убрать из избанных?</p>

        <div className={m.buttonWrapper}>
          <button className={m.button} onClick={() => onClickDelete()}>
            Да
          </button>
          <button className={m.button} onClick={() => close(false)}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}

export default WarningProjectPopup;
