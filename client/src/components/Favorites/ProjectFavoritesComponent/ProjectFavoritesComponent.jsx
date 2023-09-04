import m from "./ProjectFavoritesComponent.module.css";
import favorite from "../../../assets/images/star-line.svg";
import active from "../../../assets/images/star-line-active.svg";
import { useState } from "react";
import WarningProjectPopup from "../../UI/Popup/WarningProjectPopup/WarningProjectPopup";

function ProjectFavoritesComponent({ projectItems }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <div className={m.avatar}>
          <img src={projectItems?.profilePic} className={m.image} alt="" />
        </div>
        <div className={m.textWrapper}>
          <div className={m.wrapp}>
            <p className={m.projectName}>{projectItems?.projectName}</p>
            <div className={m.buttonWrapper}>
              <img
                src={projectItems.isFavorite === true ? active : favorite}
                onClick={() => setIsVisible(!isVisible)}
                className={m.starImg}
                alt=""
              />
            </div>
          </div>
          <div className={m.postWrapper}>
            <span className={m.post}>{projectItems?.jobPost}</span>
            {", "}
            <span className={m.postLevel}>{projectItems?.postLevel}</span>
          </div>
        </div>
      </div>
      {isVisible ? <WarningProjectPopup postID={projectItems.postID} close={setIsVisible} /> : ""}
    </div>
  );
}

export default ProjectFavoritesComponent;
