import ModifiedHeader from "../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import PositionProject from "./PositionProject/PositionProject";
import baseImage from "../../assets/images/NotFound.svg";
import m from "./WatchProject.module.css";
import { useState } from "react";
import SendRespond from "../UI/Popup/SendRespond/SendRespond";

function WatchProject({ items, projectId, isAdmin }) {
  const [isActive, setIsActive] = useState(false);
  const [submitValue, setSubmitValue] = useState(null);
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <ModifiedHeader isAdmin={isAdmin} />

        <div className={m.project}>
          <div className={m.projectWrapper}>
            <div className={m.avatar}>
              <img
                className={m.image}
                src={items.projectImage ? items.projectImage : baseImage}
                alt=""
              />
            </div>
            <div className={m.textWrapper}>
              <h1 className={m.title}>{items.projectName}</h1>
              <p className={m.desc}>{items.projectDesc}</p>
            </div>
          </div>
          {items?.projectPost?.length > 0 ? (
            <div className={m.positionContainer}>
              <div className={m.positionWrapper}>
                <h2 className={m.posTitle}>Открытые позиции</h2>
                {items?.projectPost?.map((pos, i) => (
                  <PositionProject
                    key={i}
                    item={pos}
                    post={items}
                    setSubmitValue={setSubmitValue}
                    setIsActive={setIsActive}
                    projectOwner={items.projectOwner}
                    projectId={projectId}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className={m.positionContainer}>
              <div className={m.positionWrapper}>
                <h2 className={m.posTitle}>Открытых позиций нет</h2>
              </div>
            </div>
          )}
        </div>
      </div>
      {isActive && (
        <SendRespond
          isActive={isActive}
          submitValue={submitValue}
          setSubmitValue={setSubmitValue}
          setIsActive={setIsActive}
          projectOwner={items?.projectOwner}
        />
      )}
    </div>
  );
}

export default WatchProject;
