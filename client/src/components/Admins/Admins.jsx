import { NavLink } from "react-router-dom";
import m from "./Admins.module.css";
import { useState } from "react";
import axios from "axios";
import { getProject, getUsers } from "../../redux/slices/paginationSlice";
import { useDispatch, useSelector } from "react-redux";
import ProjectComponent from "../Project/ProjectComponent/ProjectComponent";
import SpecialistsComponent from "../Specialists/SpecialistsComponent/SpecialistsComponent";

function Admins() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const usersPerPage = useSelector((state) => state.pagination.usersPerPage);
  const project = useSelector((state) => state.pagination.project);
  const users = useSelector((state) => state.pagination.users);
  const catalog = [{ category: "Проекты" }, { category: "Специалисты" }];

  const projectOnCurrentPage = project.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const usersOnCurrentPage = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;

  const UpdataProjectData = (items) => dispatch(getProject(items.data));
  const UpdataUserData = (items) => dispatch(getUsers(items.data));

  const currentCategory = (category) => {
    setActiveCategory(category);
    if (project.length === 0) {
      if (category === "Проекты") {
        axios
          .get(
            `/api/${userId}/users/project?page=${currentPage}&perPage=${usersPerPage}`
          )
          .then((items) => {
            UpdataProjectData(items.data);
          });
      } else if (category === "Специалисты") {
        axios
          .get(
            `/api/auth/${userId}/getAll?page=${currentPage}&perPage=${usersPerPage}`
          )
          .then((items) => {
            UpdataUserData(items.data);
          });
      }
    }
  };
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <div className={m.navCatalog}>
          {catalog.map((i) => (
            <NavLink
              key={i.category}
              className={`${m.button} ${
                activeCategory === i.category ? m.active : ""
              }`}
              onClick={() => currentCategory(i.category)}
            >
              {i.category}
            </NavLink>
          ))}
        </div>
        <div className={m.content}>
          {activeCategory === "Проекты" && (
            <>
              {projectOnCurrentPage.map((items) => (
                <ProjectComponent items={items} key={items._id} />
              ))}
            </>
          )}
          {activeCategory === "Специалисты" && (
            <>
              {usersOnCurrentPage.map((items, i) => (
                <SpecialistsComponent items={items} key={i} />
              ))}
            </>
          )}

          <div className={m.warning}>
            {activeCategory === null && (
              <h3>Выберете категорию</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admins;
