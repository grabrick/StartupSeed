import { NavLink } from "react-router-dom";
import m from "./ProjectComponent.module.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import baseImage from '../../../assets/images/NotFound.svg'
import { getProject } from "../../../redux/slices/userSlice";

function ProjectComponent(items) {
  const data = items.items;
  const [toggler, setToggler] = useState(true);
  const dispatch = useDispatch();
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const isActive = `${m.popupContainerOpen}`;
  const stock = `${m.popupContainerClose}`;
  const Desc = data?.projectDesc
  const slicedDesc = Desc?.slice(0, 600)  

  const onClickDelete = () => {
    axios.delete(`/api/profile/project/${data._id}/delete`).then(response => {
      if(response.status === 200) {
        axios.get(`/api/${userId}/project`)
        .then((items) => {
          dispatch(getProject(items.data))
        })
      }})
  }

  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <div className={m.avatar}>
          <img className={m.image} src={data.projectImage ? data.projectImage : baseImage} alt="" />
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
                  to={`/project/view/${data._id}`}
                >
                  <button className={m.editButton}>Посмотреть</button>
                </NavLink>
                <div
                  className={m.NavLink}
                >
                  <button onClick={() => onClickDelete()} className={m.editButton}>Удалить</button>
                </div>
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
