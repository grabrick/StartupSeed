import m from "./SpecialistFavoritesComponent.module.css";
import favorite from "../../../assets/images/star-line.svg";
import active from "../../../assets/images/star-line-active.svg";
import { useState } from "react";
import WarningUserPopup from "../../UI/Popup/WarningUserPopup/WarningUserPopup";

function SpecialistFavoritesComponent({ userItems }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <div className={m.avatar}>
          <img src={userItems?.profilePic} className={m.image} alt="" />
        </div>
        <div className={m.wrapp}>
          <div className={m.nameWrapper}>
            <div className={m.WrapperWrapper}>
              <span className={m.name}>{userItems?.fname}</span>
              {", "}
              <span className={m.name}>{userItems?.lname}</span>
            </div>
            <div className={m.imgWrapper}>
              <img
                src={userItems.isFavorite === true ? active : favorite}
                onClick={() => setIsVisible(!isVisible)}
                className={m.starImg}
                alt=""
              />
            </div>
          </div>

          <div className={m.postWrapper}>
            <span className={m.post}>{userItems?.post}</span>
            {", "}
            <span className={m.postLevel}>{userItems?.postLevel}</span>
          </div>
        </div>
      </div>
      {isVisible ? <WarningUserPopup userID={userItems.userID} close={setIsVisible} /> : ""}
    </div>
  );
}

export default SpecialistFavoritesComponent;
