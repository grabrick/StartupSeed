import { useDispatch, useSelector } from "react-redux";
import ModifiedHeader from "../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./Specialists.module.css";
import SpecialistsComponent from "./SpecialistsComponent/SpecialistsComponent";
import { useState } from "react";
import { setSearchQuery } from "../../redux/slices/paginationSlice";
import Pagination from "../UI/Pagination/Pagination";
import { NavLink } from "react-router-dom";

function Specialists({ users, project, isAdmin }) {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.pagination.users);
  const [searchInput, setSearchInput] = useState({
    input: "",
    postLevel: "Любой",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const changeHandler = (event) => {
    setSearchInput({ ...searchInput, [event.target.name]: event.target.value });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const usersPerPage = 10; // Количество отображаемых пользователей на странице
  const usersOnCurrentPage = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  console.log(usersOnCurrentPage);
  const handleSearch = () => {
    const value = {
      input: searchInput.input,
      postLevel: searchInput.postLevel,
    };
    const { input, postLevel } = value;
    if (input || postLevel) {
      const filteredUsers = allUsers.filter((user) => {
        return user.more.job.post;
      });
      dispatch(
        setSearchQuery({
          filtered: filteredUsers,
          input: value.input,
          postLevel: value.postLevel,
        })
      );
    }
  };

  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader isAdmin={isAdmin} />
        {project.length === 0 ? (
          <div className={m.warning}>
            <div className={m.warningWrapper}>
              <h1 className={m.title}>Специалисты</h1>
              <p className={m.text}>
                Для доступа к специалистам, пожалуйста,{" "}
                <NavLink to="/profile/create" className={m.createProject}>
                  создайте свой проект в личном кабинете
                </NavLink>{" "}
                и добавьте минимум одну позицию специалиста.
              </p>
            </div>
          </div>
        ) : (
          <div className={m.SpecialistsContainer}>
            <div className={m.navbarWrapper}>
              <input
                className={m.findInput}
                placeholder="Должность"
                type="text"
                name="input"
                value={searchInput.input}
                onChange={changeHandler}
              />
              <select
                className={m.selector}
                defaultValue="Любой"
                name="postLevel"
                value={searchInput.postLevel}
                onChange={changeHandler}
              >
                <option value="Любой">Любой</option>
                <option value="Junior">Junior</option>
                <option value="Middle">Middle</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
              <button className={m.findButton} onClick={() => handleSearch()}>
                Найти
              </button>
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
        )}
      </div>
    </div>
  );
}

export default Specialists;
