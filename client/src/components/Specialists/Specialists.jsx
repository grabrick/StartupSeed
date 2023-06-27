import { useDispatch } from "react-redux";
import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./Specialists.module.css";
import SpecialistsComponent from "./SpecialistsComponent/SpecialistsComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { getProject } from "../../redux/slices/userSlice";
import Pagination from "../Pagination/Pagination";

function Specialists({ users }) {
  console.log(users);
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const usersPerPage = 10; // Количество отображаемых пользователей на странице
  const usersOnCurrentPage = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const Project = (items) => {
    dispatch(getProject(items));
  };

  useEffect(() => {
    axios
      .get(`/api/${userId}/project`)
      .then((items) => {
        Project(items.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader />
        {users.length > 0 ? (
          <div className={m.SpecialistsContainer}>
            <div className={m.navbarWrapper}>
              <input
                className={m.findInput}
                placeholder="Должность"
                type="text"
              />
              <select
                className={m.selector}
                defaultValue="Любой"
                name="postLevel"
              >
                <option value="Любой">Любой</option>
                <option value="Junior">Junior</option>
                <option value="Middle">Middle</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
              <button className={m.findButton}>Найти</button>
            </div>

            <div className={m.usersContainer}>
              {usersOnCurrentPage.map((items, i) => (
                <SpecialistsComponent items={items} key={i} />
              ))}
            </div>
            {users.length > 10 ? (
              <div className={m.pagination}>
                <Pagination
                  totalPages={Math.ceil(users.length / usersPerPage)}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className={m.warning}>
            <h1 className={m.title}>Специалисты</h1>
            <p className={m.text}>
              Для доступа к специалистам, пожалуйста, создайте свой проект в
              личном кабинете и добавьте минимум одну позицию специалиста.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Specialists;
