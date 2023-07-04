import { useSelector } from "react-redux";
import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./WatchSpecialist.module.css";
import ProfileComponent from "./ProfileComponent/ProfileComponent";
import InfoComponent from "./InfoComponent/InfoComponent";

function WatchSpecialist() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <ModifiedHeader />
        <div className={m.specialistContainer}>
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
              <button className={m.addFavorite}>Добавить в избранное</button>
              <button className={m.addMessage}>Отправить приглашение</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchSpecialist;
