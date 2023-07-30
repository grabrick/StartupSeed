import { NavLink } from "react-router-dom";
import m from "./ProjectComponent.module.css";

function ProjectComponent({ items }) {
  return (
    <NavLink className={m.link} to={`/project/${items._id}`}>
      <div className={m.container}>
        <div className={m.wrapper}>
          <div className={m.projectContainer}>
            <div className={m.avatar}>
              <img className={m.image} src={`http://startupseed.ru/${items?.projectImage}`} alt="" />
            </div>
            <div className={m.infoWrapper}>
              <h4 className={m.title}>{items?.projectName}</h4>
              <p className={m.description}>{items?.projectDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default ProjectComponent;
