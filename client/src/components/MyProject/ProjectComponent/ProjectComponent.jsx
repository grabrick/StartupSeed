import { NavLink } from "react-router-dom";
import m from "./ProjectComponent.module.css";
import { useState } from "react";

function ProjectComponent(items) {
  const data = items.items;
  const [toggler, setToggler] = useState(true);
  const isActive = `${m.popupContainerOpen}`;
  const stock = `${m.popupContainerClose}`;
  const Desc = data.projectDesc
  const slicedDesc = Desc.slice(0, 600)
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <div className={m.avatar}>
          <img className={m.image} src={data.projectImage} alt="" />
        </div>
        <div className={m.titleContainer}>
          <div className={m.titleWrapper}>
            <p className={m.title}>{data.projectName}</p>
            <div className={m.popupWrapper}>
              <div className={m.popup} onClick={() => setToggler(!toggler)}>
                {"..."}
              </div>
              <div className={toggler ? stock : isActive}>
                <NavLink
                  className={m.NavLink}
                  to={`/profile/project/${data._id}/edit`}
                >
                  <button className={m.editButton}>Изменить</button>
                </NavLink>
                <NavLink
                  className={m.NavLink}
                  to={`/profile/project/${data._id}/edit`}
                >
                  <button className={m.editButton}>Посмотреть</button>
                </NavLink>
                <NavLink
                  className={m.NavLink}
                  to={`/profile/project/${data._id}/edit`}
                >
                  <button className={m.editButton}>Удалить</button>
                </NavLink>
              </div>
            </div>
          </div>
          <p className={m.desc}>{slicedDesc}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectComponent;
