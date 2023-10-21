import { useDispatch, useSelector } from "react-redux";
import ModifiedHeader from "../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import NavBar from "../UI/NavBar/NavBar";
import m from "./MyProject.module.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { getProject, getUser } from "../../redux/slices/userSlice";
import ProjectComponent from "./ProjectComponent/ProjectComponent";
import ActivitySelector from "../UI/Selectors/ActivitySelector/ActivitySelector";
import ProfileComponent from "../UI/Profile/Profile";

function MyProject({ isAdmin }) {
  const data = useSelector((state) => state.users.user);
  const project = useSelector((state) => state.users.myProject);
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const dispatch = useDispatch();

  const User = (items) => {
    dispatch(getUser(items));
  };

  const Project = (items) => {
    dispatch(getProject(items));
  };

  useEffect(() => {
    axios
      .get(`/api/auth/${userId}/get`)
      .then((items) => {
        User(items.data);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(`/api/${userId}/project`)
      .then((items) => {
        Project(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader isAdmin={isAdmin} />

        <div className={m.wrapper}>
          <h1 className={m.title}>Личный кабинет</h1>
          <div className={m.content}>
            <div className={m.bar}>
              <ProfileComponent data={data} />
              <ActivitySelector />
              <>
                <NavBar currentBtn={"Project"} />
              </>
            </div>
            <div className={m.infoBar}>
              <div className={m.warningInfo}>
                {project?.length > 0 ? (
                  <div className={m.projectContainer}>
                    <h3 className={m.projectTitle}>Мои проекты</h3>
                    <div className={m.projectWrapper}>
                      {project?.map((items, i) => (
                        <ProjectComponent key={i} items={items} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className={m.warningTitle}>
                    У вас нет активных проектов. Для их поиска перейдите в
                    раздел{" "}
                    <NavLink className={m.projectLink} to="/project">
                      “Проекты”
                    </NavLink>{" "}
                    или создайте свой
                  </p>
                )}
                <NavLink className={m.linkWrapper} to="/profile/create">
                  <button className={m.createBtn}>Создать проект</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProject;
