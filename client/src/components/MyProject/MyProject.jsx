import { useSelector } from "react-redux";
import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import NavBar from "../NavBar/NavBar";
import m from "./MyProject.module.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function MyProject() {
  const data = useSelector((state) => state.users.user);

  useEffect(() => {
    axios.get()
  }, [])
  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader />
        <h1 className={m.title}>Личный кабинет</h1>

        <div className={m.wrapper}>
          <div className={m.bar}>
            <div className={m.profileWrapp}>
              <img
                alt=""
                src={data.more?.pers?.profilePic}
                className={m.avatar}
              ></img>
              <p className={m.name}>
                <span>{data?.fname}</span> <span>{data?.lname}</span>
              </p>
              {data.more?.pers?.gender ? (
                <div className={m.littleWrapp}>
                  <p className={m.genderText}>{data.more?.pers?.gender}</p>
                  <p className={m.location}>
                    <span>{data.more?.pers?.country}, </span>
                    <span>{data.more?.pers?.city}</span>
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <select className={m.selector} name="" id="">
              <option value="В поиске проекта">В поиске проекта</option>
              <option value="Не ищу проект">Не ищу проект</option>
            </select>
            <>
              <NavBar currentBtn={"Project"} />
            </>
          </div>
          <div className={m.infoBar}>
            <div className={m.warningInfo}>
              <p className={m.warningTitle}>
                У вас нет активных проектов. Для их поиска перейдите в раздел
                “Проекты” или создайте свой
              </p>
              <NavLink to="/profile/create">
                <button className={m.createBtn}>Создать проект</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProject;
